---
layout: post
title: "Progress Report: May 2018"
---
# Introduction
Welcome to May's Progress Report! This month Vita3K saw numerous improvements across core components and usability, bringing it that much closer to its ultimate goal of allowing commercial games to be playable. Additionally there were several optimizations done to help ease testing.

# Major Changes

## Game Installation And GUI ([#234](https://github.com/vita3k/vita3k/pull/234), [#245](https://github.com/vita3k/vita3k/pull/245))
The emulator can now be opened directly, without the need to supply a vpk via a command line argument. It will show an interface where users can select an application to start from the **installed applications**.

**Installation** happens automatically when **supplying a command line argument**. So instead of just running the supplied game, Vita3K now installs and then runs it.

This was a bit of a controversial decision that's been discussed and rejected in the past, but we decided to finally go with it as it simplified IO code quite a bit. The main disadvantage is that it keeps a separate copy of installed applications.

Game data is stored in `ux0:/app/TITLEID` in Vita3K's "pref" directory and users might potentially want to change that since it consumes disk space there instead of Vita3K's root directory. For Windows, this "pref" path is in `%AppData%/Vita3K/Vita3K` (so, inside the C drive), but we do aim to make it configurable eventually.

## OpenGL 4.1 ([#253](https://github.com/vita3k/vita3k/pull/253))

Porting to a newer OpenGL version has been planned for a while, since 2.1 (which is 12 years old!) was understandably proving to be inadequate.

This PR does that, as well as implement a _whole_ lot of texture formats that weren't supported before.

## More Kernel Synchronization Primitives 

### Condition Variables ([#236](https://github.com/Vita3K/Vita3K/pull/236), [#250](https://github.com/Vita3K/Vita3K/pull/250))

### Event Flags ([#239](https://github.com/Vita3K/Vita3K/pull/239))

### Refactoring ([#231](https://github.com/Vita3K/Vita3K/pull/231))
---

An important part of operating system [kernel](https://www.wikiwand.com/en/Kernel_(operating_system)), is to provide its usermode programs ways to cooperate in a way that guarantees no [race-conditions](https://www.wikiwand.com/en/Race_condition) happen.

This is solved by providing **synchronization primitives**. Two examples of those are condition variables and event flags. The Vita also has “lightweight” versions of those, which essentially perform faster by making some trade-offs.

The PRs above implement condition variables, lightweight condition variables and event flags as well as refactor kernel code so that future changes and maintainance is easier.


------------
# Notable Improvements

### VitaGL Support ([#252](https://github.com/vita3k/vita3k/pull/252))

VitaGL is a library that allows homebrew games to use OpenGL calls. It translates them to the graphics API that the Vita understands (GXM), making it easy for homebrew developers to use their OpenGL knowledge to make homebrew.

Basic VitaGL support has been added. That is, various fixes that allow this library to start to work with Vita3K. This PR prevents VitaGL games from crashing, but a lot more work needs to be done to get these games to properly display anything.

### Savedata0 Support ([#226](https://github.com/vita3k/vita3k/pull/226))

A simple, yet crucial improvement to the emulator. Adding support for the `savedata0` partition allows commercial games to create, remove and modify save files.

### Optimizations

#### Texture Cache ([#239](https://github.com/Vita3K/Vita3K/pull/239))
#### VSync for main OpenGL context ([#231](https://github.com/Vita3K/Vita3K/pull/231))

---

We don't want to focus on optimizations yet, but it does ease testing occasionally, and these are some low-hanging fruit that were done to improve it. 

### Shader struct support ([#223](https://github.com/vita3k/vita3k/pull/223))
Many commercial games (and a few homebrew) use at least  _some_  shaders with structs in them, which previously errored when compiling the OpenGL program, since we weren't parsing and generating the stubs correctly.

This PR adds support to our GLSL stub shader generator for GXP structs.

### Refactoring and Various Fixes ([#263](https://github.com/vita3k/vita3k/pull/263), [#256](https://github.com/vita3k/vita3k/pull/256))

IO fixes and logging improvements, and a lot of code cleaning and refactoring that helps maintainability and future changes.

Also makes the window be resizable which helps with testing (fitting multiple debug windows in a single screenshot).

Progress Screenshots
====================
## Commercial Games

Progress from this month allowed these games to go in-game and thanks to hand-written shaders we can actually see what's going on.

### SwapQuest

Probably the first game to go in-game with graphics (hand-crafted shaders aren't perfect so there are some artifacts).

#### Screenshots

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown.png)

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(1).png)

#### Video
[![](https://img.youtube.com/vi/Odro8wrLrlQ/0.jpg)](https://www.youtube.com/watch?v=Odro8wrLrlQ)


### 10 Second Ninja ([#230](https://github.com/vita3k/vita3k/pull/230))

#### Screenshots
![](https://user-images.githubusercontent.com/36709480/40812190-c1b9cfd6-6534-11e8-9d1c-939101056f22.png?width=1006&height=627)
![](https://user-images.githubusercontent.com/36709480/40812239-02ca633c-6535-11e8-8564-5041a7ae8e05.png?width=1006&height=627)
#### Video
[![](https://img.youtube.com/vi/irWsme9DMBo/0.jpg)](https://www.youtube.com/watch?v=irWsme9DMBo)

### Downwell [(#230)](https://github.com/vita3k/vita3k/pull/230)

![](https://user-images.githubusercontent.com/36709480/40811988-cf0b4f6c-6533-11e8-8a50-4e728ef94d2e.png?width=1006&height=627)
![](https://user-images.githubusercontent.com/36709480/40811855-4aa3333e-6533-11e8-8db2-62aba7e13e18.png?width=1006&height=627)

### Alone With You
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(2).png)
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(3).png)

### Siralim
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(4).png)
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(5).png)
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(6).png)

Saving works as well:
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(7).png)

### Darius Burst: Chronicle Saviours

No shaders written for this one, but it boots:
![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(8).png)

## Homebrew

Here’s a few other screeshots showing homebrews that either boot or are playable for the first time after this month’s work.

### Vita Hexen II

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2018-06-01/unknown(9).png)

### GNU Robbo ([#234](https://github.com/vita3k/vita3k/pull/234))

![](https://user-images.githubusercontent.com/36709480/40622779-7f468c40-62a3-11e8-9664-0e83ceaff620.png)

#### SDLLopan ([#234](https://github.com/vita3k/vita3k/pull/234))

![](https://user-images.githubusercontent.com/36709480/40808311-09a229aa-6527-11e8-9fd1-327094f54608.png?width=1006&height=627)

#### Manga Downloader ([#234](https://github.com/vita3k/vita3k/pull/234))

![](https://user-images.githubusercontent.com/36709480/40622568-8e19c3c8-62a2-11e8-8bcd-4d0f051e4d26.png?width=1006&height=627)

# ZeldaROTH

Roadmap
===
Here's a rough list of major tasks we're prioritizing at the moment, other than fixing bugs. They will likely be explained in more detail once implemented.
- **Callback system**
It is common for Vita functions to work with callbacks instead of blocking. We don't have such a system for callbacks yet, so we can't implement all those functions properly.
-  **Kernel and sync primitive improvements**
- **Fonts**
Every homebrew that uses SceFont (a lot of them) can't boot at the moment, it's one of the most important modules needed for homebrew to work.
- **Dialogs**
There has been some initial work on this using our new GUI, but more is needed.
 
Closing Words
=============
Hacked around shaders allowing commercial games to show graphics is great and all, and actually helps with testing/development, but it's important to note that **the project is still very much in its early steps**.

Figuring out things like shaders and shader translation will take a while, but we're quite excited about solving that and any other challenges we'll face trying to emulate the Vita. The only limiting factor here is the developers' spare time, something which our [Patreon](https://www.patreon.com/Vita3K) could help with by funding more time for development.

---
This post was written by a developer - unless we get more people willing to help write these reports (or record/edit videos), we can’t promise they’ll be regular and more detailed, so if you’re interested, contact us on our Discord.

### Github Statistics
The past month, [197 commits](https://github.com/Vita3K/Vita3K/compare/master@%7B05-01-18%7D...master@%7B05-31-18%7D) across **51** Pull Requests have been merged, with **14,178** added lines and **8,066** deletions in **269 files**, by [**7 contributors**](https://github.com/Vita3K/Vita3K/graphs/contributors?from=2018-05-01&to=2018-05-31&type=c).

Thanks to *IllusionMan1212* and *Zangetsu* for providing the screenshots/videos and testing.

That’s all, thanks for reading!
