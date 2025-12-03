RUN=docker compose run --rm -it
RUN_APP=${RUN} app
RUN_APP_LIVE=${RUN} --service-ports app

# Misc
default: help

##
## —— Executables ——————————————————————————————————————————————————————————————

.PHONY: npm
npm: ## Run a npm command on a new app container
	@${RUN_APP} npm $(c)

##
## —— Dev ——————————————————————————————————————————————————————————————————————

package-lock.json: package.json
	@${RUN_APP} npm install

.PHONY: start
start: package-lock.json ## Start app in dev mode
	@${RUN_APP_LIVE} npm run dev

##
## —— Lint and tests ———————————————————————————————————————————————————————————

.PHONY: lint
lint: ## Lint app
	@${RUN_APP} npm run lint

##
## —— Deploy ———————————————————————————————————————————————————————————

.PHONY: deploy
deploy: package-lock.json lint ## Deploy app
	@${RUN_APP} npm run build-only
	@{RUN_APP} npm run deploy

##
## —— Utilities ————————————————————————————————————————————————————————————————

.PHONY: sh
sh: ## Open a shell on a new app container
	@${RUN_APP} sh

.PHONY: help
help: ## Show help for each of the Makefile recipes.
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
