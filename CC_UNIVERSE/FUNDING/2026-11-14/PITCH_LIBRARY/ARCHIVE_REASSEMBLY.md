# Reassemble the funding package ZIP

GitHub currently hosts the original **15 presentation PDFs and package index** individually, plus the **exact original 7,904,446-byte ZIP** divided into eight binary parts here to stay within the upload size limit.

Each numbered `.zip.partNN` file is a byte-for-byte slice of `Carnival_Careers_15_Pitch_PDFs.zip`. This is **not** a set of independent ZIP files.

To recover the complete ZIP on Windows, download this folder (or clone the repository) and run in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\reassemble-archive.ps1
```

The script verifies this archive's SHA-256:

```text
6b19eca8afc5d1b2350944e3418765b8ccbdd6cd1f790d9093c7497f26b907b9
```

macOS / Linux:

```bash
cat Carnival_Careers_15_Pitch_PDFs.zip.part0* > Carnival_Careers_15_Pitch_PDFs.zip
printf '6b19eca8afc5d1b2350944e3418765b8ccbdd6cd1f790d9093c7497f26b907b9  Carnival_Careers_15_Pitch_PDFs.zip\n' | sha256sum -c -
```

A full preassembled ZIP is also available in the original ChatGPT conversation.
