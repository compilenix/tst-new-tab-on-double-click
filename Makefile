.PHONY: xpi update_extlib

xpi:
	cd src && $(MAKE)
	mv -v src/tst-new-tab-on-double-click*.xpi ./

update_extlib:
	cd src && $(MAKE) $@
