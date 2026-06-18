.PHONY: help deploy status

MSG ?= Update website content

help:
	@echo "Available commands:"
	@echo "  make deploy                         Add, commit, and push to origin/main"
	@echo "  make deploy MSG=\"Your message\"      Use a custom commit message"
	@echo "  make status                         Show changed files"

deploy:
	git add .
	git commit -m "$(MSG)"
	git push origin main

status:
	git status --short
