#!/usr/bin/env python3
"""Build portable skill and five-source ChatGPT packs using only the stdlib."""
from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile, ZIP_DEFLATED
import re

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills/kira-chan"
DOCUMENTS = ["SKILL.md", "references/daily.md", "references/topic.md",
             "references/character-bible.md", "references/publishing.md"]
IMAGES = ["reference-chibi.png", "pixel.png", "actions.png", "style-card.png"]


def build(output):
    output.mkdir(parents=True, exist_ok=True)
    skill_files = DOCUMENTS + ["assets/" + name for name in IMAGES]
    parts = ["# KIRA Handbook\n\n공통 스킬에서 생성한 ChatGPT 프로젝트 자료.\n"]
    parts += [(SKILL / name).read_text(encoding="utf-8") for name in DOCUMENTS]
    handbook = "\n\n---\n\n".join(parts)
    handbook = re.sub(r"\[([^\]]+)\]\(references/[^)]+\)", r"\1 (이 문서의 해당 절)", handbook)
    for name in IMAGES:
        handbook = handbook.replace("assets/" + name, name)
    project_files = {
        "README.md": (ROOT / "chatgpt/README.md").read_bytes(),
        "project-instructions.txt": (ROOT / "chatgpt/project-instructions.txt").read_bytes(),
        "upload/KIRA-HANDBOOK.md": handbook.encode("utf-8"),
    }
    project_files.update({"upload/" + name: (SKILL / "assets" / name).read_bytes() for name in IMAGES})
    # Build privately first; replace only generated archives after readback succeeds.
    with TemporaryDirectory(dir=output) as temporary:
        staging = Path(temporary)
        with ZipFile(staging / "kira-chan-skill.zip", "w", ZIP_DEFLATED) as archive:
            for name in skill_files:
                archive.write(SKILL / name, "kira-chan/" + name)
        with ZipFile(staging / "kira-chan-chatgpt-project.zip", "w", ZIP_DEFLATED) as archive:
            for name, data in project_files.items():
                archive.writestr("kira-chan-chatgpt-project/" + name, data)
        with ZipFile(staging / "kira-chan-skill.zip") as archive:
            assert archive.testzip() is None
            assert set(archive.namelist()) == {"kira-chan/" + name for name in skill_files}
            for name in skill_files:
                assert archive.read("kira-chan/" + name) == (SKILL / name).read_bytes()
        with ZipFile(staging / "kira-chan-chatgpt-project.zip") as archive:
            assert archive.testzip() is None
            assert len([name for name in archive.namelist() if "/upload/" in name]) == 5
            for name, data in project_files.items():
                assert archive.read("kira-chan-chatgpt-project/" + name) == data
        for path in staging.iterdir():
            path.replace(output / path.name)
    print("Built skill pack (9 files) and ChatGPT pack (5 project sources + instructions + guide).")


if __name__ == "__main__":
    build(ROOT / "downloads")
