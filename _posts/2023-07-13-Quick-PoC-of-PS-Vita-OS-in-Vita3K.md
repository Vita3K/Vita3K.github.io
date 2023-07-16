---
layout: post
title: "Quick PoC of PS Vita OS in Vita3K"
---
Hello everyone, I'm happy to show you a novelty to come in the more or less near future, if we get there of course... :D
But is not pritory for now!

Here's the current status of the PlayStation Vita OS emulated on Vita3k.

With the work of the various developers on the vita3K team, like:

Macdu is responsible for the biggest stuff, on the implementation of PAF module support with implement and stub some internal functions, and other various functions to successfully boot the Shell.

Zangetsu38 implemented most of the functions of the SceRegMgr library, which takes care of creating and saving the registry file that stores all PS Vita and OS settings.

Like OS language, date format etc...

And also stub some functions in Appmgr for redirect some path for can allow booting more and get first screen of initial setup.

This stuff of Zagetsu38 is already in the master.

Several other developers and hackers have helped Zangetsu38 with other stuff for success finish the initial setup and access the lock screen with some hack and stub.

Like Bookmist, CreepNT and Princess of Sleeping.

The current state does not yet allow access to the home or live area, need more works.

Enjoy with video and see you next time!

<iframe width="560" height="315" src="https://www.youtube.com/embed/8mJpwd7i-vg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
