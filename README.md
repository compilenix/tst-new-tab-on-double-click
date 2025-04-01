# TST New Tab On Double Click

This is a Firefox extension that opens a new tab as a child tab when double-clicking on an existing tab in Tree Style Tab.

## Installation

### From Firefox Add-ons

1. Go to the [Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/tst-new-tab-on-double-click/)
2. Click the "Add to Firefox" button
3. Confirm the installation in Firefox

### From Git Releases

1. Download the latest release from the [Releases page](https://git.compilenix.org/CompileNix/tst-new-tab-on-double-click/-/releases)
2. Load the extension in Firefox: `about:debugging#/runtime/this-firefox` > Load Temporary Add-on > Select the `tst-new-tab-on-double-click.xpi` file

### From Source

1. Clone the repository: `git clone https://git.compilenix.org/CompileNix/tst-new-tab-on-double-click.git`
2. Navigate to the project directory: `cd tst-new-tab-on-double-click`
3. Build the extension: `make xpi`
4. Load the extension in Firefox: `about:debugging#/runtime/this-firefox` > Load Temporary Add-on > Select the `tst-new-tab-on-double-click.xpi` file

## Configuration

You can configure the extension to open the new tab as the first or last child of the clicked tab. To do this, go to the extension's options page and select the desired option.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
