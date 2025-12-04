RUN=docker compose run --rm
RUN_APP=${RUN} app
RUN_APP_LIVE=${RUN} --service-ports app

# Misc
default: help

##
## —— Executables ——————————————————————————————————————————————————————————————

.PHONY: npm
npm: ## Run an arbitrary npm command on a new app container, e.g. make npm c="install"
	@${RUN_APP} npm $(c)

##
## —— Dev ——————————————————————————————————————————————————————————————————————

package-lock.json: package.json
	@${RUN_APP} npm install

.PHONY: start
start: package-lock.json ## Start app in dev mode
	@${RUN_APP_LIVE} npm run dev

.PHONY: build
build: package-lock.json ## Build app
	@${RUN_APP} npm run build-only

##
## ——  Lint and format —————————————————————————————————————————————————————————

.PHONY: lint
lint: ## Lint app
	@${RUN_APP} npm run lint

.PHONY: format
format: ## Format source code
	@${RUN_APP} npm run format

##
## —— Utilities ————————————————————————————————————————————————————————————————

.PHONY: sh
sh: ## Open a shell on a new app container
	@${RUN_APP} sh

.PHONY: clean
clean: ## Remove dist and node_modules
	@${RUN_APP} sh -c "rm -rf dist node_modules"

.PHONY: help
help: ## Show help for each of the Makefile recipes.
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m##/[33m/'
