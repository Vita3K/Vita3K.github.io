---
layout: post
title: "3 years Progress Report: Summer 2024"
---

# Introduction
Welcome back to another "three years later" progress report! As mentioned in the last report, our team isn't the most active with progress reports. Nonetheless, it's been a while, and we miss you! Over the course of three years there have been a number of important changes. Let's check them out!

# Graphics library (GXM) changes

Developer [Macdu](https://github.com/Macdu) is interested in everything but the GUI, and his vast knowledge has allowed him to make many improvements to the emulator. The most important of these changes have been in the graphics backend where he has made more changes than can accurately be described here in-depth.

## Vulkan support ([#1973](https://github.com/Vita3K/Vita3K/pull/1973))

The most important contribution thus far is the addition of the [Vulkan](https://en.wikipedia.org/wiki/Vulkan) API -- a cross-platform 3D graphics and computing API, to the emulator. Being able to use a more modern and widely-adapted standard has made it possible to bring back (somewhat) active support for MacOS, as well as the ability to port the emulator to Android!Vulkan is a modern graphics API that offers many advantages such as higher speeds and more precise control. However, its rigidity makes it prone to crashes (OpenGL can ignore inaccuracies and continue rendering) and it is not the default renderer, but if you have a GPU that supports Vulkan, we recommend switching to Vulkan.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(5).webp)

**A major step forward in history. This is the first image of vulkan renderer. Where's happy meal?**

![](https://github.com/Vita3K/compatibility/assets/107111782/44d6b55b-a6b0-49fd-b3e1-83de2874d1c5)

**Ingame scene from Atelier Ayesha; graphics have been greatly improved. Compare it to the one in the [previous report](https://vita3k.org/2021/07/31/3-years-Progress-Report.html)!**

## Upscaling support ([#1812](https://github.com/Vita3K/Vita3K/pull/1812))

Continuing his hot streak and along with Vulkan comes support for upscaling in both renderers! This feature is one that many have been waiting for, and it's finally here! Upscaling is one of the greatest motivating points for most to use emulators. Upscaling helps be able to see details that can't be seen on the original console, and allows for a truly modern and immersive experience. Not that we don't love it, but sometimes the Vita's 544p display just doesn't cut it for us enthusiasts ;D

## Implement memory mapping ([#2272](https://github.com/Vita3K/Vita3K/pull/2272))

The PS Vita has a unified memory layout, meaning that both the CPU and GPU have access to the same memory. This is different compared to modern computers, where the memory accessed by the CPU and GPU is most of the time separated. Up to this point, to simulate this, Vita3K had a really simple model which basically was: every time the GPU wanted to access any resource, copy it entirely from the RAM to some one-time use GPU memory. This worked most of the time but had many downsides:

- This is incredibly inefficient and wastes many CPU cycles as well as the memory bandwidth. Note that this is not too much of an issue on most PCs but it becomes one on mobile devices.

- Except the image being rendered, the GPU cannot modify the resources it accesses (as they are only one-time copies). However, the PS Vita supports writing to resources, which means games using this feature will exhibit graphical issues.

"Memory mapping" is an improved way to simulate the unified memory layout of the PS Vita (there are actually multiple implementations for it available on Android, each with its upsides and downsides: native buffer, double buffer...). It results in greatly improved performances and much improved accuracy.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/one_after.jpg)

<!-- <iframe id="juxtapose-frame" frameborder="0" class="juxtapose" width="100%" src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=cfe50540-4d35-11ef-9396-d93975fe8866"></iframe> -->

**Ingame scene from One Piece: Burning Blood; If everyone had the power of clear-clear fruit, it wouldn't be interesting.**

## Implement shader interlock ([#2716](https://github.com/Vita3K/Vita3K/pull/2716))

The PS Vita GPU is what is called a tiled renderer. This differs significantly from PC GPUs which are called immediate renderers. Each have their pros and cons. One notable advantage for tiled renderers is that when updating the pixel in an image, the color of the pixel before the update can easily be retrieved: this is called framebuffer fetch. 

Framebuffer fetch is not something that is cost-free for immediate renderers and can be really hard to simulate without the right tools. One of the (only) tool to do so is called Shader Interlock.  Shader Interlock is available on most modern GPUs (except AMD GPUs on Windows so far because AMD developers [don't want to implement it...](https://github.com/GPUOpen-Drivers/AMDVLK/issues/108#issuecomment-524159358)). Implementing it on the Vulkan renderer (it was already implemented on the OpenGL renderer) fixes many transparency and overlapping issues like boxing graphics.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/mortal_after.jpg)

<!-- <iframe id="juxtapose-frame" frameborder="0" class="juxtapose" width="100%" src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=4557c9fc-4d36-11ef-9396-d93975fe8866"></iframe> -->

**Ingame scene from Mortal Kombat; This game has some enthusiastic fans.**

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/soul_after.webp)

<!-- <iframe id="juxtapose-frame" frameborder="0" class="juxtapose" width="100%" src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=951b581c-4e7d-11ef-9396-d93975fe8866"></iframe> -->

**Ingame scene from SOUL SACRIFICE; Note the fire at the far right. No more flickering boxes!**

## Implement async pipeline compilation ([#3145](https://github.com/Vita3K/Vita3K/pull/3145))

[Macdu](https://github.com/Macdu) has also brought support for asynchronous and multithreaded pipeline (shader) compilation to the Vulkan renderer. If a pipeline has been estimated to not be essential, another thread handles it and the draw is skipped until the pipeline is compiled. This comes with two main advantages:

- First, it greatly decreases pipeline compilation times as there can be now up to 6 threads (!) concurrently compiling pipelines/shaders instead of just one.

- Previously, emulation would pause while all of the pipelines for a given scene compiled, resulting in potential stutters during gameplay. Now the main thread no longer needs to wait for pipeline compilation, significantly decreasing stutter. 

This does come with a trade-off, however. Since the shaders have not yet been compiled, some objects may have missing textures or other graphical glitches while the shaders are compiling.

There is an option to enable/disable this option which can also be modified while in-game. By default this option is set to ON.

[Pipelines](https://docs.vulkan.org/spec/latest/chapters/pipelines.html) are Vulkan's version of graphical [shaders](https://en.wikipedia.org/wiki/Shader). These two terms may be used interchangeably during this report.

## Texture replacement ([#2716](https://github.com/Vita3K/Vita3K/pull/3009))

Keeping with the punches, [Macdu](https://github.com/Macdu) also introduced support for texture replacement and (proper) texture dumping to the emulator. This feature allows you to replace textures in games with your own textures -- such as HD texture packs. Using texture replacement to its fullest can improve the graphical fidelity of a game far past what the Vita was originally capable of. This introduction brings many new ways for Vita games to be played, as well as assisting texture and translation patch creators in their works. Alternatively, you could replace every texture in a game with the color red if you'd like!

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(3).webp)

**Ingame scene from English patched Tales of Hearts R Infinite Evolve. As you know, Macdu is a big fan of JRPGs.**

## Implement anisotropic filtering ([#1852](https://github.com/Vita3K/Vita3K/pull/1852))

Anisotropic filtering is a technique used in computer graphics to improve image quality by reducing aliasing artifacts. It is often used in 3D rendering to improve the appearance of textures on surfaces that are viewed at oblique angles. This technique improves the appearance of the product even though the load is not high.

## Implement FSR upscaler ([#2596](https://github.com/Vita3K/Vita3K/pull/2596))

[FSR](https://gpuopen.com/fidelityfx-superresolution/) is a new upscaling technology developed by AMD designed to improve the visual quality of games running on lower resolution displays. It works by using a combination of image reconstruction and temporal filtering to create a higher resolution image from a lower resolution source. The result is anti-aliasing and upscaling that improves image quality, though not dramatically. However, it is certainly a great option for obtaining good image quality in current emulators.

---

# Audio library (NGS) Changes

The audio library has been one of the biggest roadblocks thus far in improving the emulator. One major remaining problem was the complete lack of AAC decoder support three years ago. First [1whatletay](https://github.com/1whatleytay) worked on the basic implementation at [#808](https://github.com/Vita3K/Vita3K/pull/808), then [Zangetsu](https://github.com/Zangetsu38) improved it with the help of [Macdu](https://github.com/Macdu) at [#1686](https://github.com/Vita3K/Vita3K/pull/1686). Many games use atrac9, but this implementations have improved compatibility for some games like LittleBigPlanet, TALES games, wipeout and so on.

Its inner machinations haven't been completely solved, but are far better understood than they were three years ago. [Macdu](https://github.com/Macdu) has been working hard on this issue and -- while not everything is fixed yet -- Pull [#2668](https://github.com/Vita3K/Vita3K/pull/2668) has made significant improvements. Notably, this PR eliminates crackling in the Persona dancing games, pushing them all to a Playable status.

Library [cubeb](https://github.com/mozilla/cubeb) has also been added in [#2225](https://github.com/Vita3K/Vita3K/pull/2225) as a new audio backend, which is a cross-platform audio library featuring low latency. Initially this library was a workaround for the [SDL](https://libsdl.org/) audio corruption on Android, but at this time both options work.

---

# GUI changes

Developer [Zangetsu](https://github.com/Zangetsu38) has been working on improving the GUI for Vita3K. Our current GUI is based on [Dear ImGui](https://github.com/ocornut/imgui), which is a great library, but it is not designed for complex GUIs. So it will be switched to [Qt](https://www.qt.io/) one day I hope, but regardless, a GUI refresh is always a good thing.

## Compatibility notes ([#2285](https://github.com/Vita3K/Vita3K/pull/2285))

[Zangetsu](https://github.com/Zangetsu38) has added a compatibility status section to the emulator, signifying a title's current compatibility status. This is especially useful for testers, as it makes it much easier to see which games have or haven't been tested and how compatibility changes from one point to another. Additionally, in games where compatibility has not been reported, clicking 'create state report' will open a draft on GitHub. This has made reporting compatibility much easier. Note that compatibility is based on the pc version and reports are accepted only for the pc version.

![](https://user-images.githubusercontent.com/5261759/215394789-ebffaccc-10d5-4ec6-ae1f-e1077220a021.png)

**You can now check game compatibility much more easily! No more need to check [the site](https://vita3k.org/compatibility.html) every time.**

## Improve language support

[Croden1999](https://github.com/Croden1999) is enthusiastic about adding Chinese language support to the emulator and has been working with [Zangetsu](https://github.com/Zangetsu38) to make improve the emulator's language support. As a result, many parts of the GUI have been translated, which is a great help for those who are not fluent in English.

If your language is not in the emulator, please open a Pull Request or contact us in our [Discord](https://discord.gg/6aGwQzh) for assistance.

## Implement auto updater ([#1911](https://github.com/Vita3K/Vita3K/pull/1911))

[Zangetsu](https://github.com/Zangetsu38) also brought us a much-needed auto updater to the emulator with the help of [qurious-pixel](https://github.com/qurious-pixel). As one would expect, it allows you to update the emulator with just one click. Simple, AND convenient.

---

# Notable improvements
## Net improvements

Developer [EXtremeExploit](https://github.com/EXtremeExploit) has been working hard on web features -- trying to get as close to console as possible -- and has implemented most of the features in [#1676](https://github.com/Vita3K/Vita3K/pull/1676). New contributor [edwinr](https://github.com/edwinr) also dropped by and implemented various `sceNet` functions in [#2255](https://github.com/Vita3K/Vita3K/pull/2255). This has allowed for Vita Homebrew Browser to load, as well as emulated `libcurl` functions such as the ones used by [VitaSDK](https://vitasdk.org) to work properly.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(1).webp)

## Improve input ([#2628](https://github.com/Vita3K/Vita3K/pull/2628) & [#2904](https://github.com/Vita3K/Vita3K/pull/2904))

With these two PR's, [Macdu](https://github.com/Macdu) and [Zangetsu](https://github.com/Zangetsu38) bring support for motion/gyroscope controls as well as more precise touchpad support. Those with compatible controllers (ex. DualShock4, Dualsense) can use these features just like on console.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Nwur3YgIbiE" title="Vita3K - GRAVITY RUSH  - Short demo of new Touchpad + Gryo Feature with DualSense" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Gravity Rush gets a lot of mileage out of this, huh?**

## Implement controller remapping ([#2875](https://github.com/Vita3K/Vita3K/pull/2875) & [#2898](https://github.com/Vita3K/Vita3K/pull/2898))

[Zangetsu](https://github.com/Zangetsu38), [dima-xd](https://github.com/dima-xd) and [nn9dev](https://github.com/nn9dev) implemented controller remapping, which allows you to remap the controller buttons to your liking. This is a great feature for those who are not comfortable with the default button layout. It is worth noting that due to how SDL handles certain inputs, anything deemed an "axis" (i.e. analog sticks, analog triggers) are not yet supported for remapping.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(10).webp)

**Remap your controller buttons to your liking!**

## Add support for module unloading/reloading ([#3246](https://github.com/Vita3K/Vita3K/pull/3246))

Some games utilized unloading or re-loading certain [modules](https://wiki.henkaku.xyz/vita/Modules) (PS Vita Libraries), which was not previously accounted for. Notably, **Final Fantasy X** utilized this functionality, which would result in the game softlocking. Developer [Macdu](https://github.com/Macdu) implemented the appropriate functions and behavior, which pushed the game to the Playable state. What a jump!

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(4).webp)

**First ingame Final Fantasy X screenshot from Macdu.**

## Tracy profiler ([#2284](https://github.com/Vita3K/Vita3K/pull/1549))

Contributor [hobyst](https://github.com/hobyst) took it upon himself to add support for the [Tracy](https://github.com/wolfpld/tracy) profiler to the emulator. Tracy allows developers working on the emulator to see extremely in-depth information about the CPU, GPU, memory allocations, and much more, allowing for incredibly precise debugging and analyzing of the performance and workings of the code. Needless to say, this tool has proved incredibly useful. 

![](https://user-images.githubusercontent.com/48522412/145694018-8af841bf-82e1-4a63-95e9-88bb5a473a11.png)

**The GUI really makes you *feel* like a developer.**

## Set frame horizontalSize and verticalSize([#2347](https://github.com/Vita3K/Vita3K/pull/2347))

[lybxlpsv](https://github.com/lybxlpsv) fixed a long-standing bug that prevented Project Diva MV footage from loading. This allows the Project Diva series to be played without a hack.

![](https://github.com/Vita3K/compatibility/assets/107111782/b38ee26f-aa8a-4ff2-9d86-243cc742dca1)

**Ingame scene from Hatsune Miku Project Diva X; Meet the Diva on your PC!**

## A special thanks to bookmist for his numerous optimizations and code corrections!

Developer [bookmist](https://github.com/bookmist) has also brought many code optimizations and bug fixes to the emulator. You can't see them, but you'll definitely feel them! Thank you bookmist! [Here](https://github.com/Vita3K/Vita3K/commits?author=bookmist)'s a list of his activities.

---

# Compatibility

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/chart.png)

**Yes, I only spent a few minutes on this diagram.**

Compatibility testing is primarily done by volunteer testers, and three years of development have resulted in significant improvements. Three years ago, only about [3 percent](https://web.archive.org/web/20210807123006/https://vita3k.org/compatibility.html) of the games were considered playable.(And it wasn't very well maintained.) Now, Vita3K boasts upwards of [50 percent](https://vita3k.org/compatibility.html) compatibility!

Compatibility is still not perfect, though our volunteer developers are always working hard to improve it, However some great vita exclusive games like <persona>Persona 4 Golden</persona>(Not an exclusive title anymore...), Freedom Wars, Muramasa Rebirth and SOUL SACRIFICE are playable. Many of the inner workings of the Vita are still undocumented, meaning many parts must be reverse engineered in order to replicate its behavior.

Screenshots of some impressive games are shown below.

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(11).webp)

**Ingame scene from Persona 4 Dancing; KING CRAZY.**

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(6).webp)

**Ingame scene from Uncharted; It has a bug where you can't save, so it's not playable, but you can see great graphics!**

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(9).webp)

**Ingame scene from Attack on titan; A lot of koei games fixed by memory mapping.**

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(8).webp)

**Ingame scene from Ratchet & Clank; Shadow bug is fixed in [#3262](https://github.com/Vita3K/Vita3K/pull/3262).**

![](https://github.com/Vita3K/Vita3K.github.io/raw/master/_posts/img/2024-07-31/image(2).webp)

**Ingame scene from Minecraft; Must be OpenGL to play.**

---

# Donation money transition

As you may or may not know, the team has moved from Patreon to [Ko-fi](https://ko-fi.com/Vita3K) for commission reasons. The money we receive is currently not going to anyone's paycheck, and is only spent when necessary for development/hosting costs. All the project's developers are currently volunteers, and this is not anyone's full-time job.

# Final words

Thank you for reading this lengthy (but hopefully informative!) report! Additionally, the contributions of many individuals have brought about numerous unmentioned changes. It's unclear if there'll be any development or reports in the next three years, but our hopes are high. We are a completely volunteer team, and as life happens, people come and go. We're always happy for new developers to contribute, and would be pleased to have you on board.

This post was written by [nishinji](https://github.com/nishinji) -a tester- with the help of [Macdu](https://github.com/Macdu) and [nn9dev](https://github.com/nn9dev).

### Github statistics

Over the last three years, [**61 contributors**](https://github.com/Vita3K/Vita3K/graphs/contributors?from=2021-07-31&to=2024-07-31&type=c) pushed [1367 commits](https://github.com/Vita3K/Vita3K/compare/master@%7B07-31-2021%7D...master@%7B07-31-2024%7D), introducing <font color="Green">111,893</font> added lines and <font color="Red">66,092</font> deletions in **1,046 files**.
