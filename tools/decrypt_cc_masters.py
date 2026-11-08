#!/usr/bin/env python3
"""Decrypt the eight revised CC Universe master files stored as GitHub ciphertext.

Requires: python -m pip install cryptography
Usage: python tools/decrypt_cc_masters.py vault/encrypted/CC_UNIVERSE_EIGHT_MASTERS_2026-11-08.zip.aesgcm

Prompts securely for the 64-character hexadecimal AES-256 key shared with the owner.
The key is NOT in this repository, nor should it be committed or posted to issues.
"""
from pathlib import Path
import hashlib
import sys
import getpass
import zipfile
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

HEADER = b"CC-AESGCM-20261108\n"
AAD = b"CC Universe eight canonical revisions 2026-11-08"
ENCRYPTED_SHA256 = "8592b44ce14bf95d550bfe98c9726fa82009a8f77f68081175a4ebf1e776ef4f"
PLAINTEXT_SHA256 = "2837b90a2382901447e57ae325c7b1d9fc3a2cd6c7843f0afa0783d9adf67a76"

def main():
    if len(sys.argv) != 2:
        raise SystemExit(f"Usage: python {sys.argv[0]} <archive.zip.aesgcm>")
    infile = Path(sys.argv[1])
    data = infile.read_bytes()
    if hashlib.sha256(data).hexdigest() != ENCRYPTED_SHA256:
        raise SystemExit("Encrypted archive checksum mismatch; do not decrypt unverified bytes.")
    if not data.startswith(HEADER):
        raise SystemExit("Unknown CC archive format.")
    nonce = data[len(HEADER):len(HEADER)+12]
    ciphertext = data[len(HEADER)+12:]
    key_hex = getpass.getpass("Private CC Universe 64-character hex decryption key: ").strip()
    try:
        key = bytes.fromhex(key_hex)
        if len(key) != 32:
            raise ValueError("AES-256 key must have 32 bytes")
        plaintext = AESGCM(key).decrypt(nonce, ciphertext, AAD)
    except Exception as e:
        raise SystemExit("Unable to decrypt: verify your key and archive.") from e
    if hashlib.sha256(plaintext).hexdigest() != PLAINTEXT_SHA256:
        raise SystemExit("Decrypted archive SHA-256 mismatch.")
    output = infile.with_suffix("")  # removes .aesgcm, keeps .zip
    if output.exists():
        raise SystemExit(f"Output exists; refusing to overwrite: {output}")
    with zipfile.ZipFile(__import__("io").BytesIO(plaintext)) as zf:
        bad = zf.testzip()
        if bad:
            raise SystemExit(f"ZIP integrity failure: {bad}")
        revised = [n for n in zf.namelist() if n.startswith("REVISED_CANONICAL_FILES/") and not n.endswith("/")]
        if len(revised) != 8:
            raise SystemExit(f"Expected 8 revised masters; found {len(revised)}")
    output.write_bytes(plaintext)
    print(f"Verified 8 revised master files. Saved decrypted ZIP: {output}")
    print("Keep decrypted copies private; do not commit their unencrypted bytes to the public site repo.")

if __name__ == "__main__":
    main()
