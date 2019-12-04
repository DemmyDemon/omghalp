## Welcome to OMGHALP

By default, the command is `/help`, and the hotkey is {288}.  
These are both configurable in the `config.lua` file

# Adding chapters

To add a chapter, simply write it in Markdown and drop the file in the `chapters` folder.  
The name of the chapter in the chapter list will be the same as the filename, but it will strip off any numbers in the beginning of the name and translate any underscore, `_`, to a space. 

In `config.lua` you can set your `CoverPage`. This is the page that is shown when omghalp is first shown. It will not reset to this page if omghalp is closed. It'd be horrible to be in the middle of reading your long explanation on how to use the pig farming script, have to close omghalp to interact with something, and then have to find the way back to wherever you were in the text.

# A note on hotkeys

I often see people explain all the hotkeys in a static text, but then it doesn't really work for the end user.  The most common cause is that the end user has re-bound the key. For example, some users like to switch the Voice Chat key (usually N) and the Take Cover key (usually Q). When some script then listens for the Take Cover control action, and you tell the user to press Q, they will speak in the voice chat rather than take action in the script.

The solution:  Control Actions in omghalp!

Simply put the control action listened for in squiggly brackets, `{` and `}`, and it will appear like so:  
{44} (That's showing whatever you have `INPUT_COVER` bound to)

Note, however, that it only does this when the user first joins the server. If they re-bind keys while on the server they have to re-join for omghalp to notice the ney key bindings.  
You also have to be very careful about the formatting. No spaces or anything in between anything, just `{`, a number, and then `}` again to close out.

## ENJOY