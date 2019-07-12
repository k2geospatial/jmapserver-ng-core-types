# jmap-api-ng

Don't rename the NPM script named ***pub*** for ***publish***.

If a NMP script called ***publish*** exist, NPM will launched it when we publish.

As ***pub*** launch a command that publish the package on NMP, it would make a loop if it was named ***publish*** ... so don't.