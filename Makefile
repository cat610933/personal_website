.PHONY: help preview editor deploy status

MSG ?= Update website content
PORT ?= 8080
EDITOR_PORT ?= 8099

help:
	@echo "Available commands:"
	@echo "  make preview                        Preview locally and open the browser"
	@echo "  make preview PORT=8081              Preview and open a custom local port"
	@echo "  make editor                         Open the local website editor GUI"
	@echo "  make editor EDITOR_PORT=8100        Open editor on a custom local port"
	@echo "  make deploy                         Add, commit, and push to origin/main"
	@echo "  make deploy MSG=\"Your message\"      Use a custom commit message"
	@echo "  make status                         Show changed files"

preview:
	@echo "Opening http://localhost:$(PORT)"
	@(sleep 1; open "http://localhost:$(PORT)") &
	python3 -m http.server $(PORT)

editor:
	@echo "Opening http://localhost:$(EDITOR_PORT)/editor"
	@(sleep 1; open "http://localhost:$(EDITOR_PORT)/editor") &
	python3 tools/site_editor.py --port $(EDITOR_PORT)

deploy:
	git add .
	git commit -m "$(MSG)"
	git push origin main

status:
	git status --short
