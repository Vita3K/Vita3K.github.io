
# Introduction
Welcome to our *first* progress report!

This past month Vita3K has seen numerous improvements, achieving an important milestone in the development of any emulator: commercial games starting to show signs of life!

In addition, a lot of homebrews have progressed as a few important parts of the PS Vita kernel were implemented.

# Major Improvements

## Module Loading ([#122](https://github.com/Vita3K/Vita3K/pull/122), merged in [#154](https://github.com/Vita3K/Vita3K/pull/154))

Module loading was the final hurdle for loading commercial games.  
In a few words, it allows loading dynamic [modules](https://www.wikiwand.com/en/Shared_library) included with games, in Vita3K’s internal representation of the Vita’s memory.

*‘**Downwell**’*, *‘**VVVVVV**’*, *‘**Duke Nukem 3D: Megaton Edition**’* and probably many other commercial games load and print debugging output.

It’s important to note that *frangarcj* was able to implement this thanks to the [reversing work](https://github.com/vitasdk/vita-toolchain/blob/master/doc/specifications.pdf) done by many people in the Vita homebrew scene, including but not limited to *yifanlu* and *xyz*.

---
Unfortunately, it will be a while before we’ll get graphical output from commercial games, since we’re still in the process of reversing the [shader format](https://wiki.henkaku.xyz/vita/SGX543) of the Vita’s GPU. After that, we’ll need to translate those shaders to a host format, which is a challenge in and of itself. There *are* possible workarounds for this until we get to that point, but we haven't explored them yet as games crash because of reasons unrelated to graphics.

### Logs
#### [Downwell](https://hastebin.com/raw/uzugaqisuy)

## Kernel Synchronization Primitives ([#170](https://github.com/Vita3K/Vita3K/pull/170), [#159](https://github.com/Vita3K/Vita3K/pull/159), [#157](https://github.com/Vita3K/Vita3K/pull/157), [#190](https://github.com/Vita3K/Vita3K/pull/190))
An important part of operating system [kernel](https://www.wikiwand.com/en/Kernel_(operating_system)), is to provide its user-mode programs ways to cooperate in a way that guarantees no [race-conditions](https://www.wikiwand.com/en/Race_condition) happen.

This is solved by providing ***synchronization primitives***. Two very common examples are semaphores and mutexes. The Vita also has “lightweight” versions of those, which essentially perform faster by making some trade-offs.

The PRs above essentially implement semaphores, mutexes and lightweight mutexes. The Vita kernel supports many more types, but these are some really common ones used by nearly every game.

Fortunately, after the refactoring and improvements introduced by [#170](https://github.com/Vita3K/Vita3K/pull/170) and [#190](https://github.com/Vita3K/Vita3K/pull/190), several other sync primitives will be straightforward to implement.

### Screenshots

#### OpenSyobon

![](https://cdn.discordapp.com/attachments/437723202630844417/439138000992206858/opensyobon.PNG)

#### Minicraft

![](https://media.discordapp.net/attachments/437723202630844417/439138216549941269/minicraft.PNG)

#### Labyrinth 3D

![](https://media.discordapp.net/attachments/437723202630844417/439138986318102558/labyrinth3d.PNG)  
![](https://media.discordapp.net/attachments/437723202630844417/439138884085874688/unknown.png)

#### flppy Bird

![](https://media.discordapp.net/attachments/437723202630844417/439139287167139843/unknown.png)

#### HOTA

![](https://cdn.discordapp.com/attachments/437723202630844417/439139733898133504/hota.PNG)

#### HandyVita

![](https://cdn.discordapp.com/attachments/437723202630844417/439140005084921876/unknown.png)

#### milieTetris

![](https://cdn.discordapp.com/attachments/437723202630844417/439140546968289300/unknown.png)

#### Blockout

![](https://cdn.discordapp.com/attachments/437723202630844417/439135758087880722/blockout1.PNG)

#### Katawa Shoujo

![](https://cdn.discordapp.com/attachments/437723202630844417/439135963080294402/katawashoujo.png)

#### ZeldaROTH

![](https://cdn.discordapp.com/attachments/437723202630844417/439135974954369024/zeldaROTH.PNG)

#### ZeldaNSQ

![](https://cdn.discordapp.com/attachments/437723202630844417/439137746821447690/zeldaNSQ.PNG)

### GUI/Debugger ([#147](https://github.com/Vita3K/Vita3K/pull/147))

This and subsequent PRs implement a basic graphical interface using the ‘dear imgui’ immediate-mode GUI library. It adds some debugging tools that we’ll no doubt improve and expand upon as development progresses.

Booting games is still only possible by supplying them as command-line arguments, but that will change in the future.

#### Debugger UI

![](https://cdn.discordapp.com/attachments/437723202630844417/439147218788679680/unknown.png)

Progress Screenshots
====================

Here’s a few other screeshots showing homebrews that either boot or are playable for the first time after this month’s work.

#### Flood it ([#152](https://github.com/Vita3K/Vita3K/pull/152))

![](https://cdn.discordapp.com/attachments/437723202630844417/439135510393389076/floodit.PNG)

#### Numpty Physics ([#163](https://github.com/Vita3K/Vita3K/pull/163))

![](https://cdn.discordapp.com/attachments/437723202630844417/439135636293681164/numpty.PNG)

#### ZeldaNSQ ([#159](https://github.com/Vita3K/Vita3K/pull/159))

![](https://cdn.discordapp.com/attachments/437723202630844417/439137746821447690/zeldaNSQ.PNG)

Roadmap
===
Here's a rough list of features we're prioritizing at the moment. They will likely be explained in more detail once implemented.
- **Callback system**
It is common for Vita functions to work with callbacks instead of blocking. We don't have such a system for callbacks yet, so we can't implement all those functions properly.
- **Fonts**
Every homebrew that uses SceFont (a lot of them) can't boot at the moment, it's one of the most important modules needed for homebrew to work.
- **More sync primitives**
Conditional variables and Lightweight conditional variables
- **Dialogs**
There has been some initial work on this using our new GUI, but more is needed.


Closing Words
=============
The past month, [**146 commits**](https://github.com/Vita3K/Vita3K/compare/master@%7B1month%7D...master) have been merged, with **5,212** added lines and **1,667** deletions by [**9 contributors**](https://github.com/Vita3K/Vita3K/graphs/contributors?from=2018-03-29&to=2018-04-30&type=c).

It’s not easy to sift through each commit/Pull Request and pick out more to show off here, but hopefully we gave a decent overview of our progress the past month.

---
This post was written by a developer - unless we get more people willing to help write these reports (or record/edit videos), we can’t promise they’ll be regular and more detailed, so if you’re interested, contact us on our Discord.

Perhaps more importantly, we’re always looking for new testers! Here’s our compatibility lists for [homebrew](https://github.com/Vita3K/homebrew-compatibility) and [commercial](ttps://github.com/Vita3K/compatibility) games.

Thanks to *IllusionMan1212* for providing the screenshots and testing.

That’s all for now, thanks for reading!
