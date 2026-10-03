---
translationKey: starting-the-project
locale: zh
title: 项目起点：为什么选择 KJ66？
description: 从一款经典的小型涡喷开始，整理历史图纸与 R3 重建模型。这篇开篇手记记录选择 KJ66 的理由，以及下一步需要验证的问题。
pubDate: '2026-10-03'
tags:
  - design
  - cad
heroImage: ../../../assets/images/kj66/01-kj66-hero.png
heroAlt: KJ66 项目的单色剖面风格化生成渲染，展示发动机的内部结构形象。
heroCaption: 图 1｜项目视觉图：基于本项目模型形象制作的风格化生成渲染，非原厂或实物照片，也不作为工程尺寸依据。
status: published
---
做一台小型喷气发动机，应该从哪里开始？

我想先找到一个能够研究清楚的起点：知道它由什么组成，为什么这样布置，以及每一次修改究竟解决了什么问题。第一阶段会围绕已有设计展开，原创设计与具体推力目标将在形成基线后逐步讨论。

KJ66 就是我为这个个人项目选择的起点。**它适合建立一个有依据、能比较、可逐步深入的学习基线。** 对今天的性能水平作出判断，还需要明确的比较对象和验证。

## KJ66 是一款什么样的发动机？

KJ66，也常写作 KJ-66，是由 Kurt Schreckling 与 Jesús Artés 开发的小型涡轮喷气发动机，应用背景是模型航空。相关研究将它描述为单轴、固定几何构型，主要采用单级离心压气机和单级轴流涡轮。[^architecture]

结合结构资料，它的主要气路可以概括为：

**进气口 → 离心压气机 → 扩压器与回流通道 → 环形燃烧室 → 涡轮导向器与轴流涡轮 → 排气喷口。**[^architecture][^manual]

这里有一个值得先理解的关系：涡轮并不是单纯被气流吹动的末端零件。它从高温燃气中提取能量，通过同一根轴驱动前面的压气机；气体经过涡轮后仍有可用能量，再通过喷口加速排出，形成推力。[^nasa]

GTBA（Gas Turbine Builders Association）的 KJ66 页面给出了一个直观的历史量级：[^gtba]

- 外形约 **110 mm 直径、240 mm 长度**。
- 发动机质量约 **0.93 kg**。
- 页面列出的推力为 **75 N**，最大转速为 **117,000 rpm**。

这些数字用于认识这类发动机的尺度，**不是本项目 R3 模型已经实现的性能，也不是所有 KJ66 变体共享的一套运行限制**。不同资料和版本应保留各自的来源，不能拼接成一张看似精确的“官方参数表”。

![本项目 KJ66 R3 装配模型的三分之四剖面](../../../assets/images/kj66/02-kj66-cad-cutaway.png)

*图 2｜本项目 R3 CAD 剖面截图。保留四分之三、切去四分之一，用来观察内部装配关系；它仍是包含近似与待核实细节的重建模型。*

## 为什么从它开始？

### 从可以追溯的资料理解结构

我手里的资料包括零件图、装配爆炸图和 ARTES JET 的装配手册。手册不只告诉读者“装上哪个零件”，还涉及角接触轴承的安装方向、润滑管的位置、预紧检查，以及装配后是否存在擦碰。[^manual]

这些内容对建模很重要。一个零件看起来像什么，只是表面问题；它如何定位、怎样被支撑、和相邻零件是什么关系，才决定了模型能否成为后续研究的基础。

对我而言，这让项目可以从“复原一个外形”，转向“理解一套工程关系”。

### 可以先解决一部分问题，而不必一次发明所有部件

GTBA 对 KJ66 的介绍提到，这一设计把早期方案中的自制木质叶轮换成了涡轮增压器压气机叶轮；涡轮则采用具有成形叶型的铸造件。历史设计还讨论了扩压器通过 CNC 或模型工程车床加工、制作的路径。[^gtba]

这启发我先明确个人项目的工作边界：**把精力集中在能够理解和验证的部分。** 各个部件仍然需要扎实的工程工作。

例如，先理清机匣、轴系支撑、燃烧室和管路的关系，再决定哪些结构值得重新设计。没有必要在第一版里，同时把压气机、涡轮、材料和控制系统全部从零开始。

这里讨论的是设计思路，并不意味着历史型号的零件今天仍然容易采购，也不意味着可以随意替换高速旋转件。

### 已有制造案例，可以观察别人如何跨过“模型到实物”这一步

Max Prototypes 的项目记录提供了一个很接近我所设想的例子：他们在开发自己的 M400 之前，先制作了一台已有设计的 KJ66，用来熟悉材料和后续会遇到的问题。记录展示了从图纸建立三维 CAD、制作零件，到搭建控制与数据采集装置的过程。[^max]

这个案例为我提供了一条可观察的路径：**先理解已有发动机，再在自己的制造和测量能力上继续向前。** 我仍需根据自己的条件建立制造与测量证据。

![Max Prototypes 的 KJ66 制造案例，工作台上摆放着机匣、主轴、叶轮和其他零件](../../../assets/images/kj66-workshop-parts.png)

*图 3｜Max Prototypes 的 KJ66 初期零件制作照片。图片来自对方的[项目原网页](https://maxprototypes.com/pages/kj66-turbojet-engine)，展示的是对方制作的实物，作为制造案例参考。*

![本项目 KJ66 R3 爆炸装配图及中英文部件索引](../../../assets/images/kj66/03-kj66-exploded-bilingual.png)

*图 4｜本项目 R3 的 CAD 爆炸装配视图。它用于拆解子系统与接口，不是实物拆解照片。合并的燃烧室仍以单一部件显示；轴承、叶轮等参考几何不能据此直接制造。*

[打开原尺寸爆炸图（4400 × 3000），查看部件索引](/jet-engine/images/kj66/03-kj66-exploded-bilingual.png)。

### 不止有图纸，还能找到继续分析它的方法

我也希望这个项目最终不只停在一张好看的渲染图上。

2018 年的一篇扩压器初步设计研究，把 KJ66、MW54 和 TK50 等已有设计的数据作为方法核对的参考；2022 年的另一项工作则以 KJ66 的单级涡轮为对象，研究导向叶片与转子型面的多目标优化。[^diffuser][^turbine]

2024 年发表于 *Journal of the Global Power and Propulsion Society* 的研究，进一步把压气机和涡轮的三维 CFD 模型嵌入整机部件级模型，并用已有地面试验数据比较预测结果。[^gpps]

这些研究给了我一种循序渐进的可能：先从结构和简单估算开始，再做部件分析，最后理解各个部件怎样在整机里相互匹配。它们是研究方法的参考，**不代表论文中的几何、边界条件或改进幅度，可以直接套到我的模型上**。

## 选择经典方案，不等于绕过验证

KJ66 适合作为我的学习起点，但我不会把“有历史资料”理解成“照着画就一定能安全运行”。

仅在资料整理阶段，就需要先分清版本。我收集到的一组文件虽然文件名含有 KJ66，图纸标题实际上写的是 **Turbine T66**。它可以提供相关设计的参考，却不能未经核对就替代 KJ66 的尺寸。[^t66]

资料的可获得性也应如实说明：截至本文整理时，GTBA 的 KJ66 页面明确写着该站已不再提供它的图纸。**能找到介绍、旧图和案例，不等于今天能从原渠道取得完整资料，更不等于它具有明确的开放硬件许可。**[^gtba]

ARTES 手册本身也反复涉及轴承、润滑和转动擦碰检查。[^manual] 因此，我会把数字模型、工程分析和实体试验分开记录：模型能打开、零件不重叠，与热态运行可靠，是不同层次的问题。

## 这个项目准备怎样往前走？

我的目标仍然是：**在合理的工程约束下，用更低的重量获得更大的持续推力，并降低同等推力下的燃油消耗。** 这些方向需要逐步验证，当前还没有可报告的性能成绩。

接下来，我准备沿着三条线推进：

- **把基线整理清楚。** 为尺寸、材料和接口保留出处，区分原图信息、重建假设与新设计。
- **把问题逐个说清楚。** 从管路、装配、润滑和热间隙出发，再研究流道、燃烧室与重量之间的取舍。
- **把每次修改记录下来。** 说明改了什么、为什么改、用什么证据判断，以及还有哪些事情没有验证。

本文展示的是项目中的数字模型与视觉资料，不报告实体试车成果。未来若有仿真或测量结果，我会同时记录对应版本、工况和限制，而不会拿历史 KJ66 的参数充当自己的数据。

理解经典方案之后，我希望继续开展自己的迭代。

**我更想从一个可以追溯的起点出发，逐渐学会解释：一台喷气发动机为什么能工作，以及怎样判断一次修改是不是真正的进步。**

---

## 资料与参考

正文中的网络资料于 **2026 年 10 月 3 日**核对。历史设计介绍、公开研究与本项目模型是不同层次的信息。

[^architecture]: *Full-engine simulation of micro gas turbine based on time-marching throughflow method*，**Applied Thermal Engineering**，2022。出版方公开页面的 “Case background” 说明了开发者、模型航空背景，以及单轴、单级离心压气机和单级轴流涡轮构型。[出版方页面](https://www.sciencedirect.com/science/article/abs/pii/S135943112201136X)。本次使用公开摘要及片段，未据此声称通读付费全文。

[^gtba]: Gas Turbine Builders Association，*KJ66*。[GTBA 设计介绍](https://gtba.co.uk/engine_designs/kj66.php)。用于历史尺寸、质量、推力与转速概况，以及压气机、涡轮和制造背景。该页同时标注图纸已不再提供；本项目未把其历史采购信息视为当前可用性保证。

[^manual]: ARTES JET，*Assembling Manual / KJ66 Kit*，作者提供的扫描件 `kj66 manual.pdf`。参见第 3 页爆炸图、第 12 页系统布置，以及第 13—16 页关于轴承、润滑、装配与擦碰检查的说明。这是本项目资料，不在本博客素材包中转载原文或扫描页。

[^nasa]: NASA Glenn Research Center，*Turbojet Engines*。[工作原理说明](https://www.grc.nasa.gov/WWW/k-12/airplane/aturbj.html)。用于涡轮经主轴驱动压气机、燃气经喷口产生推力的一般原理，不作为 KJ66 具体几何或性能的依据。

[^max]: Max Prototypes，*KJ66 turbojet engine*。[制造者项目记录](https://maxprototypes.com/pages/kj66-turbojet-engine)。用于“先制作 KJ66，再开发 M400”的项目路线，以及 CAD、零件制作和数据采集的案例。图 3 来自该项目页面，展示的是对方制作的实物。

[^diffuser]: M. Czarnecki、J. Olsen，*Combined Methods in Preliminary Micro Scale Gas Turbine Diffuser Design – a Practical Approach*，**Journal of Applied Fluid Mechanics**，2018，11(3)：567–575。DOI：10.29252/jafm.11.03.28150。[论文页面](https://www.jafmonline.net/article_616.html)。此处引用公开摘要中的研究范围，不把其结果视为本项目已经达到的性能。

[^turbine]: Q. Tang、H. Wu、H. Lou，*Multi-Objective Optimization of Aerodynamic Performance for a Small Single-Stage Turbine*，**Journal of Applied Fluid Mechanics**，2022。DOI：10.47176/jafm.15.05.33561。[论文页面](https://www.jafmonline.net/article_2079.html)。此处用于说明 KJ66 可作为部件优化研究对象，不引用改进百分比作为本项目目标或预测。

[^gpps]: W. Deng、Z. Wei、M. Ni、H. Gao、G. Ren，*Direct multi-fidelity integration of 3D CFD models in a gas turbine with numerical zooming method*，**Journal of the Global Power and Propulsion Society**，2024，8：166–176。DOI：10.33737/jgpps/186054。[论文全文页面](https://journal.gpps.global/Direct-multi-fidelity-integration-of-3D-CFD-models-in-a-gas-turbine-with-numerical,186054,0,2.html)。其研究对象和性能参照使用特定的 KJ66 资料及 ISA 海平面条件，不等于本项目已验证的实测基线。

[^t66]: 作者提供的 `kj66 drawings1.pdf` 及其重复文件。图纸标题标注为 **Turbine T66**；例如第 5 页为压气机导流系统，第 7 页为轴承支承管。这一来源识别是本项目资料整理结果，不意味着两个版本之间已经完成尺寸兼容性验证。
