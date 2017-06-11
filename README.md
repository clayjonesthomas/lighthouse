# readme
# to start gae run 'gae' from the command line
# to run webpack stuff get in directory /src/lighthouse and run 'webpack'

### Bugwatch
## in NewPostHandler, the onSubmit function skips over .then when fired
## for some reason.
## fixed; make sure your ajax isn't returning an error or the .then will
## be skipped.
#
# In Container, if you remove the ModalHandler, other things from other
# handlers stop displaying.