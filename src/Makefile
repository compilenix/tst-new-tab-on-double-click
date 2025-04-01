.PHONY: xpi init_extlib update_extlib install_extlib

xpi: init_extlib install_extlib
	rm -fv ./*.xpi
	zip -r -9 tst-new-tab-on-double-click.xpi manifest.json _locales extlib background.js constants.js options.html options.js -x '*/.*'

init_extlib:
	git submodule update --init

update_extlib:
	git submodule foreach 'git checkout trunk || git checkout main || git checkout master && git pull'

install_extlib:
	rm -fv extlib/*.js
	cp -v ../submodules/webextensions-lib-l10n/l10n.js extlib/; echo 'export default l10n;' >> extlib/l10n.js
