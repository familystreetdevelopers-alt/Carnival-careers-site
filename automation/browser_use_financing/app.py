"""Local financing console. Private documents never enter the public repository."""
import asyncio
import hashlib
import json
import os
import sqlite3
from pathlib import Path

import streamlit as st
from runner import BASE, blockers, inspect_route, load_json

PRIVATE = Path(os.getenv('CC_FINANCE_HOME', str(Path.home() / 'CarnivalCareersFinance')))
PRIVATE.mkdir(parents=True, exist_ok=True, mode=0o700)

def claim(provider):
    with sqlite3.connect(PRIVATE / 'submissions.sqlite') as db:
        db.execute('CREATE TABLE IF NOT EXISTS submissions (provider TEXT PRIMARY KEY, result TEXT)')
        try:
            db.execute('INSERT INTO submissions VALUES (?, ?)', (provider, json.dumps({'status': 'IN_PROGRESS'})))
        except sqlite3.IntegrityError:
            return False
    return True

def save_result(provider, result):
    with sqlite3.connect(PRIVATE / 'submissions.sqlite') as db:
        db.execute('UPDATE submissions SET result=? WHERE provider=?', (json.dumps(result), provider))

st.title('Carnival Careers financing')
st.caption('Upload your verified profile and documents once. Select lenders and submit eligible applications in one run. Counterparty messages remain Gmail drafts.')
profile_path = PRIVATE / 'profile.json'
upload = st.file_uploader('Verified application profile', type=['json'])
if upload:
    try:
        profile = json.loads(upload.getvalue())
        if not isinstance(profile, dict):
            raise ValueError('Profile must be a JSON object')
        profile_path.write_text(json.dumps(profile), encoding='utf-8')
    except (ValueError, UnicodeDecodeError) as error:
        st.error(str(error))
        st.stop()
if not profile_path.exists():
    st.info('Upload the private application profile to begin. Evidence flags must be supported by original documents.')
    st.stop()
profile = load_json(profile_path)
routes = load_json(BASE / 'lender_routes.json')
selected = st.multiselect('Lenders', [r['provider'] for r in routes])
uploads = st.file_uploader('ID, registration, agreements, invoices and financial records', accept_multiple_files=True, type=['pdf', 'png', 'jpg', 'xlsx', 'docx'])
for item in uploads:
    name = hashlib.sha256(item.getvalue()).hexdigest()[:16] + '_' + Path(item.name).name
    (PRIVATE / name).write_bytes(item.getvalue())
files = sorted(p for p in PRIVATE.iterdir() if p.suffix in {'.pdf', '.png', '.jpg', '.xlsx', '.docx'})
approved = {}
for provider in selected:
    approved[provider] = st.multiselect('Documents to upload to ' + provider, files, format_func=lambda p: p.name[17:], key=provider)
    route = next(r for r in routes if r['provider'] == provider)
    for missing in blockers(profile, route):
        st.warning(provider + ' — ' + missing)
if st.button('Submit eligible applications', disabled=not selected):
    for route in routes:
        provider = route['provider']
        if provider not in selected:
            continue
        missing = blockers(profile, route)
        if missing:
            st.warning(provider + ' — ' + '; '.join(missing))
            continue
        if not approved[provider]:
            st.warning(provider + ' — Select the supporting documents first')
            continue
        if not claim(provider):
            st.info(provider + ' — Previous submission attempt recorded. See saved result before any retry.')
            continue
        with st.spinner('Completing ' + provider):
            try:
                result = asyncio.run(inspect_route(profile, route, 'submit', approved[provider]))
            except Exception:
                result = {'provider': provider, 'status': 'REVIEW_REQUIRED', 'submitted': None, 'missing': ['Run interrupted. Inspect lender account before retrying.']}
            save_result(provider, result)
            st.json(result)
if (PRIVATE / 'submissions.sqlite').exists():
    with sqlite3.connect(PRIVATE / 'submissions.sqlite') as db:
        results = {p: json.loads(r) for p, r in db.execute('SELECT provider,result FROM submissions')}
    st.download_button('Download confirmations and missing items', json.dumps(results, indent=2), 'financing-results.json')
    st.json(results)
