# 키라쨩 카드뉴스 · KIRA-chan

키라쨩과 고양이 픽셀로 **AI 뉴스·경제 시사·주제별 카드뉴스 10장**을 만드는 설치형 스킬입니다. 헤르메스와 Codex에서는 스킬로, ChatGPT 웹에서는 프로젝트 지침과 참조 자료로 사용합니다.

[오늘의 카드뉴스 보기](https://aihubos.github.io/kira-chan/) · [스킬 원문](skills/kira-chan/SKILL.md) · [ChatGPT 설치 안내](chatgpt/README.md)

## 바로 설치

### 헤르메스

헤르메스가 설치된 터미널에서 실행합니다.

```bash
hermes skills install aihubos/kira-chan/skills/kira-chan
```

헤르메스가 표시하는 설치 내용을 확인한 뒤 진행합니다. 새 대화에서 다음처럼 요청합니다.

```text
키라쨩 스킬을 사용해서 오늘 AI 카드뉴스 10장을 만들어줘.
```

설치 후 스킬 목록에서 `kira-chan`과 캐릭터 참조 파일이 있는지 확인합니다. 기존 스킬이 있다면 사용자 수정분을 보존하고 다음으로 업데이트합니다.

```bash
hermes skills update kira-chan
```

구버전에서 GitHub 설치 명령을 지원하지 않으면 [스킬 ZIP](https://aihubos.github.io/kira-chan/downloads/kira-chan-skill.zip)을 풀어 `kira-chan` 폴더를 해당 헤르메스 프로필의 `skills` 폴더에 넣습니다. 기본 경로는 `~/.hermes/skills/kira-chan/`입니다. 기존 폴더를 덮어쓰지 말고 별도로 백업한 뒤 교체합니다. 수동 설치판은 같은 방법으로 갱신합니다.

공식 설치 방식: [Hermes Skills System](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/).

### ChatGPT 웹 프로젝트

**[ChatGPT용 설치 파일 다운로드](https://aihubos.github.io/kira-chan/downloads/kira-chan-chatgpt-project.zip)**

1. 내려받은 ZIP의 압축을 풉니다.
2. ChatGPT에 새 프로젝트를 만듭니다.
3. `project-instructions.txt`를 프로젝트 지침에 붙여 넣습니다.
4. `upload` 폴더의 5개 파일을 프로젝트 자료로 올립니다.
5. 프로젝트 대화에서 카드뉴스 제작을 요청합니다.

자세한 설치·업데이트·발행 예시는 [ChatGPT 안내](chatgpt/README.md)에 있습니다. 프로젝트는 지침과 자료를 이용하는 방식이며, GitHub 링크만으로 프로그램이나 자동 발행이 설치되는 방식은 아닙니다. [OpenAI 공식 안내](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt).

### Codex 등 SKILL.md 지원 도구

[스킬 ZIP](https://aihubos.github.io/kira-chan/downloads/kira-chan-skill.zip)을 풀고 `kira-chan` 폴더를 도구의 스킬 경로에 넣습니다. Codex 기본 경로는 `~/.codex/skills/kira-chan/`입니다. 기존 사용자 수정분은 백업하고 새 대화에서 `$kira-chan`으로 호출합니다. 저장소 전체를 스킬 폴더에 넣을 필요가 없습니다.

## 무엇을 만들 수 있나요?

| 요청 | 결과 |
|---|---|
| 오늘 AI 카드뉴스 | AI·에이전트·국내·세계 관련 소식과 날씨 10장 |
| 오늘 경제 카드뉴스 | 정치·정책·경제·증시·재테크·날씨 10장 |
| 두 판 모두 | AI 10장 + 경제 10장 |
| 이 보고서로 카드뉴스 | 첨부 자료에 맞춘 주제별 10장 |
| 내 GitHub에 발행 | 본인 저장소의 페이지·이미지·출처 게시, 또는 수동 업로드 파일 |

한국어, 목표 1080×1350 세로 4:5. 흰 배경과 차콜 본문, AI는 보라·경제는 딥그린, 제목에만 은은한 입체감을 사용합니다. 키라쨩과 픽셀의 기준 외형을 유지합니다. 최종 이미지·원고·출처·생성 프롬프트·Threads 문구를 제공합니다.

스킬은 제작 절차와 자료를 제공합니다. 실제 웹 검색·이미지 생성·파일 저장 기능은 사용하는 서비스에 필요합니다. 구독·사용량·연결 도구에 따라 가능한 범위가 달라집니다. 생성 도구가 없으면 원고와 프롬프트까지만 만들 수 있습니다. 설치만으로 이미지 생성 서비스나 게시 계정이 연결되지는 않습니다.

## 내 계정으로 발행하기

[발행 안내](skills/kira-chan/references/publishing.md)를 따릅니다. 원본을 자신의 GitHub 계정으로 Fork하고 Pages를 활성화하면 기존 뷰어를 재사용할 수 있습니다. 공유 주소는 본인 주소로 변경합니다. 웹 프로젝트에서 직접 게시할 도구가 없으면 제작 파일을 내려받아 GitHub 웹에서 업로드합니다.

`aihubos/kira-chan`의 발행 권한·메신저 수신자·개인 설정은 배포 패키지에 포함되지 않습니다. QR은 사용자가 제공한 원본을 요청 시 넣습니다. 매일 자동 실행이나 메신저 전송은 별도로 요청하고 해당 환경에서 설정해야 합니다.

## 저장소 구성

- `skills/kira-chan/`: 공통 스킬·캐릭터 기준 이미지·편집 및 발행 규칙
- `chatgpt/`: 프로젝트 지침·설치 안내
- `downloads/`: 바로 내려받는 스킬/프로젝트 설치 묶음
- `YYYY-MM-DD/`, `assets/YYYY-MM-DD/`: 기존 날짜별 발행본과 PNG
- `index.html`: 한국시간 오늘의 경제판·AI판을 찾는 고정 홈
- `reader.css`, `card-frame.css`: 날짜별 뷰어 공통 스타일

기존 날짜·이미지와 고정 홈을 보존하고 새 발행본을 추가합니다. 과거 발행 예시: [2026-09-20 AI](https://aihubos.github.io/kira-chan/2026-09-20/) · [2026-09-20 경제](https://aihubos.github.io/kira-chan/2026-09-20/economy/).

## 배포 파일 갱신

관리자는 공통 스킬·자료를 수정한 뒤 아래 한 줄로 두 설치 묶음을 다시 만듭니다. Python 3 표준 기능만 사용하며 별도 패키지가 필요하지 않습니다.

```bash
python3 scripts/build-packs.py
```

ChatGPT Handbook은 공통 스킬에서 자동으로 합쳐지므로 직접 수정하지 않습니다. 생성된 `downloads/` 파일도 함께 커밋합니다. 기존 카드뉴스 발행 폴더나 개인 작업 디렉터리를 설치 묶음에 넣지 않습니다.
