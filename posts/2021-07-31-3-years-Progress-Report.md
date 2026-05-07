---
layout: post
title: "3 years Progress Report: Summer 2021"
---

Welcome to the 3 years progress report. Since the last report, three years have passed, however, from there, no more reports were submitted. Many people thought the project was dead, many came to the communication channels like Discord server for an answer. So what happened between this long gap?

First, let's get to the report. It's obvious everyone wants to hear more about what has improved over the last three years. The answer to the question above, will be answered later in the report, with an announcement following...


## Graphic library (GXM) changes

![image9](https://user-images.githubusercontent.com/25717050/127731941-0bc07c7c-cea8-47b9-b78a-3f2fdfc894d5.png)

**Ingame scene from Persona 4 Golden; the foundational works on our renderer and shader recompiler was pushed forward by adjusting to this game.**

![image3](https://user-images.githubusercontent.com/25717050/127731991-837c724b-52d9-4a19-8125-86b2cdb3f358.png)

**Ingame scene from Akiba’s Trip; it’s one of the most sophisticated 3d graphics scenes that vita3k can render perfectly.**


### Introduction

Over the last 2 years, the graphics backend of the emulator has gradually improved. While unfortunately it's not yet perfect, it's good enough for the majority of the Vita's library.

Most GXM features map directly to modern desktop graphics APIs. The GXM API from a high-level view is similar to DirectX 11, with a few additional low level features. It includes a powerful ability to do threading with two types of graphics context a) Immediate, which submits drawing commands to driver directly, and b) Deferred, which lets you record commands from another thread, then execute them in the immediate context. Only a small chunk of the Vita library utilizes this powerful part of the API.

However, there are also a lot of parts that provide difficulties and challenges to map to the emulator. This ranges from low level features like GPU memory which can be mapped to CPU, so the texture data and framebuffer data can be modified at any time, to features that are a burden to port to PC overall: two-sided graphics rendering, and programmable blending.


### Shader translator

The shader translator is also one of the big challenges facing us, due to the fact that there's very little in the way of information around it online. However, the team has overcome that. The shader translator emits SPIR-V code, as the final target API of the emulator is Vulkan. For now we only have an OpenGL backend, so this code is translated to GLSL from SPIR-V. While the shader translator has worked quite efficiently: the instruction set of the GPU, while not particularly large, is very interesting and tries to fit as much as it can in each 64 bits instruction, it still has some edge cases that won't translate properly, like shaders with loops. We will continue to put effort into it in the future.


### Programmable blending

Another challenge that's worth mentioning is programmable blending. Normally graphics API defines for you some formulas of blending which you can apply for and the pipeline will do the job. For programmable blending, you can define how to blend yourself, inside the pixel shader. Note that the Vita GPU family is targeted for mobile, in which the rasterizer technique allows extended ability to do custom blending in shader. However, desktop GPUs are not designed for that. So there exist multiple extensions which help to achieve this job, but it's very populated and sometimes being ignored by the vendor due to the low amount of need for it. We have tried our best to use all extensions available to use to support this feature. Games like Persona 4 Golden and many more use this technique, and it works quite well so far.


### Precomputation

In GXM, you can fill in info about what you want to draw: like what shaders to use, the vertex and index buffer, and the uniform buffer to use, to a struct beforehand. Then it can be reused multiple times. This is called precomputation. A small amount of games use this features, notably Persona 4 Golden. This feature can be somewhat expensive to translate to morden API, since it requests changing the state of texture slots and shader programs each time a precomputed draw is requested, then to change it back if a normal draw occur, because precomputation textures and shaders are different from the normal shaders and textures set using API like `sceGxmSetVertexProgram` and `sceGxmSetFragmentProgram`.

This feature was implemented by developer [Watchful](https://github.com/KorewaWatchful), with the help of other developers like [desgroup](https://github.com/1whatleytay) and [sunho](https://github.com/sunho).


### Deferred

![image4](https://user-images.githubusercontent.com/25717050/127732106-6a44a181-02de-4b52-a694-0b1f100eb452.png)

**とある魔術の電脳戦機** **is one of the game that benefits from deferred implementation most, in which the mecha and the UI got rendered.**

As said before, deferred allows building up rendering commands from other thread to create a command list. This command list can then be executed in the main rendering thread. This is a way to ease the workload and computation that the main rendering thread has to do.

First, we want to talk about the rendering design on the emulator. Vita3K runs with main thread reading rendering commands submitted by another thread to an unified queue, then passes those commands to a backend for processing. This model is very promising and suited for the GXM API. Let’s take a look at why.

For all graphics context, the game gives the API the memory to allocate rendering commands. Immediate context can submit commands directly to the driver once `sceGxmEndScene` is called, and those commands once submitted are thrown away, so we have an optimized bitmap allocator to allocate commands from the given memory pool and free them when the render thread has received them. The render command is extremely lightweight, and they all have the same size, therefore, a bitmap allocator is suited for this job.

As for deferred, these commands can be reused multiple times, until the memory holding these commands are freed. Therefore, a bitmap allocator is not suited for deferred. But thinking about it, we never have free commands nor any extra allocations at all. The deferred context allows users to pass a callback that allows the GXM API to reserve more memory to hold commands. Combine these two facts together, we decided to use linear allocation, which is, just continuously taking memory for allocation until it runs out, then reserve more memory.

But another problem rises. Data in GXM is usually mapped and readed directly when commands are executed. Since we have a middle layer, which is a rendering queue, we need to copy the data to a new memory region, because if we keep using the pointer to the old memory region with this middle layer, by the time it reaches your GPU driver, the data is probably modified. In immediate context, the data is usually copied, ideally when `sceGxmDraw` is called. With the deferred context, `sceGxmDraw` is actually recorded, and the data given to the deferred context for the call at that time may not be correct yet. Therefore, we need a way to describe which data to copy when the command list is executed. So we have a linked list of structures that tells us which data to copy when the command list is about to be submitted using `sceGxmCommandListExecute`.

With these ideas, developer [pent0](https://github.com/pent0) implemented support for deferred context, also optimized the number of commands sent to the driver. This helps some games to start displaying graphics, like Sly Racoon and Attack on Titans: Wings of Freedom. 


### Status

We've tried to optimize and clean the graphics backend part of the emulator as best as we can. We are very proud about the command list model. Since OpenGL contexts are tied to one thread, but with just a context pointer, GXM graphics contexts can be used in any thread, this is a huge advantage. As the paragraph above said, this also allowed the deferred context to be implemented with ease. Our shader recompiler has implemented all of the common functionalities such as ALU instructions, memory load from uniform buffer, mapping vertices from vertex shader to fragment shader, and texture sampling, and we hope to add more texture sampling mode and more edged-case instructions, to improve compatibility overall. 


## Kernel and CPU changes

![image7](https://user-images.githubusercontent.com/25717050/127732111-532b8332-43e5-45e4-9a76-dc36131b079b.png)

**Ending scene from Saenai Heroine no Sodatekata: Blessing Flowers; the game has motivated us to aim for perfect libult and libpvf emulation over the last year. It’s now playable from beginning to end with little audio glitches.**

### Introduction

One of the most important responsibilities of the kernel is loading the program to memory.  Since Vita3k was able to boot simple homebrew games, we’ve gotten a decent implementation for this task. With this daunting milestone accomplished, it seemed like all the rest of the tasks were going to be relatively simple and straightforward: come up with HLE (high level emulation) implementations for common kernel features such as semaphore, mutex, etc. It turned out there were much more than that. 

#### Implementing user-level system libraries

The main obstacle we’ve faced was the hassles of working on HLE implementation of user-level system libraries such as `libpvf` (font library), `libc` (standard c library) or `libult` (user-level threading library) Our manpower was limited. We couldn’t reverse every library and reimplement it very accurately. We tried the HLE approach to libc initially, which failed miserably because of differences in implementation details and insane amount of work required. 

We endeavored to get past this obstacle by loading low-level firmware code of these libraries. This approach is commonly known as low level emulation. (LLE) It was not an easy job to LLE these libraries, because they usually utilize special features such as NEON and much lower level kernel functions which were more difficult to reverse. Yet, we were able to do it for `libc` eventually. Once we successfully LLEd `libc`, we’ve observed a massive number of games had progressed from nothing to boot, menu, or ingame. Still, overhauling LLE `libpvf` and libult seemed impossible.

We succeeded in getting `libpvf` and `libult` to work for simple cases by implementing libraries they depended on such as libfiber. But, this was not enough. libpvf was using ARM SIMD extension very heavily. It turned out Unicorn had many inaccuracies in its SIMD implementation, including a complete hang when translating a particular set of instructions. This prevented LLE libpvf from working without hacks. LLE libult was very fragile. It randomly crashed every time, and this random crash was destined to happen when it was given more workload.

#### Bringing Dynarmic into game

We’ve overcome these hassles by changing our CPU backend altogether. From the starting point of the emulator, we have been using Unicorn to emulate the CPU. It worked quite well, but had many bugs and inaccuracies as mentioned before. Unicorn has been severely lacking maintenance. For example, it has been using an old version of qemu from 2015. qemu is the heart of Unicorn, as Unicorn is essentially modified qemu. It has been missing out 6 years of improvements in jit generation, bug fixes, etc. There was an insane bug which turned on instruction level monitoring even when we didn’t turn it on.  We also suspected that it also affected the speed of the emulator, since it clears the JIT cache every time the cpu loop exits.

For those reasons we were excited to wait for Dynarmic to add support for ARMv7 instruction set, which the Vita heavily relies on. This include extended SIMD instructions and another instruction encoding: Thumb32. However, it was very long to wait, the main developer of the CPU emulator: [MerryMage](https://github.com/merrymage) has been busy with her own works in real life and with Yuzu, while none of us had enough knowledge to do so. Recently, [sunho](https://github.com/sunho), another developer, tried to add fundamental support to it for Dynarmic. Following up, Mary and lioncash decided to gear up and finish the work for us, also helping a hand. For now, the support for ARMv7 in Dynarmic is near-perfect.

By employing Dynarmic, LLE libpvf is now working without any hack. LLE libult has experienced major progress. It turned out libult relied heavily upon ARM exclusive instructions. ARM exclusive instructions are somewhat different from those of x86. ARM has extended typical CAS instruction by bringing an exclusive monitor which tracks the exclusive load and store globally and helps the core to discard all later exclusive stores to a certain address. Unicorn didn’t implement this behavior because they used single-core qemu source code, so it ensured sequential consistency not transactional nature. On the other hand, Dynarmic supported accurate implementation of exclusive monitors. With help of this, we were able to remove random crashes within LLE libult, and Vita3k is starting to become usable with this improved stability.

### Status

While performance is not there in some heavier games, it runs simple visual novel games and some complicated 3d games full speed. We are able to boot tons of games, and many of them go ingame. Various commercial games, including Digimon, Saenai, Persona 4 Golden, Akiba, To love ru, and Virtual Tennis, run fairly stable without any sign of freeze or random crash in long hours of gameplay. We are particularly excited for the future with Dynarmic, as the developer of the project are very active around for help and support. There’s still a major issue with booting unity games yet, but we’re going to tackle this very hard and hopefully improve compatibility drastically.

![image2](https://user-images.githubusercontent.com/25717050/127732144-90bb7a32-cdc5-4aec-83c4-d14cdcff3d88.png)

**Ingame scene from Atelier Ayesha; it benefited tremendously from full-fledged libult emulation, transitioning from intro to ingame.**


## Audio (NGS) and Video library

In order to play audio many games use a proprietary piece of software from Sony named NGS. You can imagine NGS like a DJ, it allows you to mix and manipulate audio streams, then output the final audio data, in which you can decide whatever to do with it: save to a file or give it to the speaker to play music.

However, below the simple layer is quite complicated. It also handles decoding of proprietary audio formats like ATRAC9, ADPCM, allow reverb, echo, playback rate effect, which is a huge amount of DSP audio module (you can imagine it like the doer).

Most commercial games utilise this powerful library. No one has enough knowledge to bother to focus on it much so it has been left there for a while. But we're getting there little by little.

We can take a simple look at the system to get the big picture. Imagine your voice being autotuned. In NGS, a voice is known as the one who can give audio data and needs processing, while autotune is a module which can modify your audio data. A list of voices with the same need for a module is in something called a rack. Output for a voice of a module can be the input of another voice in another rack, but who would be the one to give the output, there must be a middle man to do the transport. So you have something called a Patch, which describes the transportation the middle man needs to do.

On the video side, many games play videos right at their boot sequence which means if there’s no video player support the game won’t make it to the menus. Many of the games have the video library static-linked (included inside the game executable), or either linked dynamically (the code for the video player is inside a DLL that lies in the system directory). Adding up with the reversing and the implementation being hard, we let most of the libraries code LLEd, with only implementing some video libraries like `SceAvPlayer`.


### Status

For now the library implemented in the emulator is still incomplete. Fundamentally, everyone needs to hear something, so we only implemented the decoding module for now. At least it improves almost all games using the library.

As of today video player support is in a really early state, which is the reason a lot of games aren’t able to go past a logo screen after booting. However, just like with NGS, video support is in the works but it might take some time due to it relying on the audio implementation of the emulator.


## Trophies!

![image10](https://user-images.githubusercontent.com/25717050/127732152-38f50c46-af96-4e16-9f97-198cf69448b9.png)

**Trophy notification in Gravity Duck. It seems the player has failed quite a lot.**

While playing games is for fun, it's more satisfying when you can grind and try hard for a reason. Trophies are like that. It's fun when you earn yourself a trophy, especially a platinum one, because it tells that you have put your best effort for the game.

Trophies API is not very hard, so it's implemented quite early in the emulator. We enjoy adding support for random things that we have the knowledge of doing. The API only consists of getting info about available, register a trophy as earned and the progress of trophies earned, so it's quite simple. We even add a notification systems using ImGui, to display what trophy you have earned. It's very fun to learn that you have earned something with a small notification, if it's silently registered there is no more fun is there?

![image12](https://user-images.githubusercontent.com/25717050/127732158-98e30598-87b6-43b0-824e-8d84c6526ff2.png)

### Status

As of now, the trophies system is complete, however the trophy save file is not identical to Vita, so you can't import them directly from your console. Sadly also, trophy is only a small part of the huge library called NP. NP also consists of other online features like matchmaking and leaderboards. We hope to do something about them in the future.


## Virtual keyboard (IME) and Save/load dialog

![image6](https://user-images.githubusercontent.com/25717050/127732170-b68ba175-c19c-4039-be14-de6f9fdca943.png)

**The standard virtual keyboard**

It can’t be denied that save/load dialog and a keyboard is an inevitable part of the PS Vita. On the game console, the virtual keyboard both supports inputting through touch and inputting by moving your D-Pad or Joysticks. And with save/load dialog, you are allowed to save the games through multiple slots, with information about when you save it or the progress of the saving, presented. Both of these combined, will create a full contented user experience.

On PSVita, the corresponding libraries that developers can use to summon virtual keyboard and save/load dialog are `SceIme`, `SceAppUtilSaveDialog` and `SceCommonDialog` respectively. These APIs were not implemented in the emulator for 2 years, previously they were stubbed to pass, however, many games required it being functional to work.

It was not until developer [IllusionMan1212](https://github.com/illusionman1212) first steps up, with a PR to implement the savedata dialog API, resulting in many games to progress. Some examples are "Criminal Girls: Invite Only", "Attack on Titan: Wings of Freedom", "Retro City Rampage", "Ridge Racer", "Berserk and the band of the hawk". Also, in April of this year (2021), developer [Zangetsu38](https://github.com/Zangetsu38) brings IME API to functional states, with the flood of PRs to implement and improve the IME libraries, allow users to proceed with "Damascus Gear: Operation Tokyo".

By utilising the ImGui library, to the full extent, and with careful considerations about the design and suitable to the language culture, both implementations of the APIs now presented very modernly in the UI. We hope users enjoy the work these developers made.

![image1](https://user-images.githubusercontent.com/25717050/127732187-b22af137-03df-40ce-b4fb-72ed0c6997f7.png)

**The virtual keyboard for French**

![image5](https://user-images.githubusercontent.com/25717050/127732194-d78fbe33-ca6f-41a2-841b-195f2e5b4ed2.png)

**Ability to switch the keyboard layout between languages**

![image11](https://user-images.githubusercontent.com/25717050/127732204-b7c3dcea-d090-424f-8590-7c36889a411a.png)

**Dialog prompt to load the save**

![image8](https://user-images.githubusercontent.com/25717050/127732211-559c81c6-39ab-44bc-bb93-fdf5953a845b.png)

**Save dialog with progress and the date the save is made**


## The support for PKG and other dump formats

This information is poorly spread around, so it's something worth talking about. Earlier on in the emulator, we only supported MaiDump. Other dump formats like NoNpDrm use some APIs or have executable structures that are incompatible or not working well at all in the emulator.

What about PKG? Unlike PS3, the filesystem inside the Vita PKG is encrypted, which requires your game license to decode properly. Earlier on in 2018, there have been attempts to add support for PKG, but it stopped at as simple as extracting the file, without the ability to decode them.

But all of those problems now have been partially solved. Developers [sunho](https://github.com/sunho) and [frangarcj](https://github.com/frangarcj) have worked very hard to implement support for missing loader features, and some corrections on it, while adding more kernel functionalities for dump format like NoNpDrm to become more stable. As a result, the emulator has some basic support for NoNpDrm dump now. MaiDump has always been stable, but the time taken to dump using the method is quite long, so this is good news.

Developer [Watchful](https://github.com/KorewaWatchful) with the help of motoharu, an expert in PS Vita filesystem and the one who develops PSVPSF, the Vita filesystem decoder, has implemented the ability to extract and decode PKG files. So now, with just a PKG and a license key/file (ZRIF or work.bin), you are able to install your game with ease.


## Emulator UI

Developer [Zangetsu](https://github.com/Zangetsu38) seems to take his interest a lot for the UI, with the crazy passion to make it resemble Vita UI as possible, while also blending in some morden factors to make it also very easy to use and initiative.

The recent work allows the users to create multiple accounts to log in to the emulator. This will act like your PSN account, which stores all of your achievements you have earned in games so far.

Following this login screen, you will be welcomed with the menu screen, which displays your current computer battery status, current time for full screen experience, and the list of games you can launch, which can be sorted from top 10 games you have played recently. On the top right, there is a notification bubble which when you click on it, will display the latest information about games generated through the emulator. Hover on the top of the screen will also reveal the classic drop down menu.

Clicking on a game will display a small space like on the Vita, containing the game's custom background and some extra information, plus a Launch button to launch the game.

You can also give it an attempt to right click on a wanted game. You will discover quite a lot of utility, you can get app info, open game folders, delete, check compatibility and in the future, the ability to discover and check trophy progress.


### Status

Currently developer Zangetsu is still working very hard to add more wanted features in the emulator. He does not have enough knowledge to contribute to the core, and he gave all efforts on improving other parts of the emulator, so it's very appreciated.


# Showcases

A little while back, we put up a quick video showcase with the compatibility report and some short footage. While we do not have the resources at the moment to put up another nice video, we will share some videos from the tester.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fvgoCMTz7rI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/jTj05d_ZyAg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/-xFi2SzLquk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/R5Fb0B1n4S4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/x0tnbQGXpec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Donation money transition

There was not much word about what the Patreon money is gonna be used for, especially for a hobby-driven, multi-developers project like Vita3K.

To tell the truth, it has just been sitting there saving. The money has only been used for paying websites and bots purposes, which to be clear, does not cost much.

Developers come and leave, this is a known fact. As sad as it is to tell, people have real life and jobs, and the interest starts to go down. This sadly has been the case for the current developer team.

People that are regular in the Discord server are clear about the fact that the Patreon money is just sitting there, however people still have much faith to still continue to put the money out for us. We appreciate that.

Because of the reasons above, we have decided to close down the Patreon. Thanks for all the supporters that have been funding us over the last three years! Over the years we have accumulated **$6015.93**, which is managed by a developer in the UK. After taxing and importing pounds, the money was **reduced to $3663.56** (unfortunately he kept the auto-transfer and Payoneer transfers them to GBP). We have decided to spread the money to our core developers, and left back two months of Patreon money, which is *£159.76*. This money left is **decided to go to bounties**. A BountySource account is created, which developers that are interested can go take an issue they feel like is in their skill range.

When taking all this in a positive way, it can’t really be. Because this is never clear to anyone about how we have used it. While we thank the Patrons for keeping the support consistently for these years without any questions, we also apologize for keeping you all in the fog. Patreon carries out a big responsibility, which we did not put much care about.

We hope the solution above is a satisfying resolve.

**Note:** Because of the communication, some regions may got charged more by the time of the Patreon shutdown (the communication between the one manages the Patreon and us is inconsistent because of real life occurences). Any extra money gained will still go towards the bounty system. We are very sorry for the inconvenience!

# Final words

Will there be any more progress reports frequently after this? With the progress being driven by interest and free time, and not many of us devoting most of our time on the emulator, that’s a no.

However, you can still keep track of the current progress and changes in the Discord, which is where most of the news is being talked about. With the new bounty system being introduced, we hope other people will spend their time and talent contributing to the emulator.

We do not consider ourself to be in a race, we are just chilling developers doing the work sometimes.

### Github Statistics
The past three years, [**47 contributors**](https://github.com/Vita3K/Vita3K/graphs/contributors?from=2018-08-31&to=2021-07-31&type=c) pushed [1633 commits](https://github.com/Vita3K/Vita3K/compare/master@%7B08-31-2018%7D...master@%7B07-31-2021%7D), introducing **129,379** added lines and **121,988** deletions in **1,305 files**.
