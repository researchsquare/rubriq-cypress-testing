.PHONY: help init run

help: #! Show this help message.
	@echo 'Usage: make [target] ...'
	@echo ''
	@echo 'Targets:'
	@fgrep -h "#!" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/:.*#!/:/" | column -t -s":"

init: #! Install all dependencies
	@npm install

open-rubriq: #! Launch the cypress runner for curie tests
	@npm run-script open:rubriq

run-rubriq:  #! Launch the cypress runner for curie tests
	@npm run-script run:rubriq


