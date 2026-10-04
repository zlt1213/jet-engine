# 图片署名与来源

文章中的全部图片均存储在本地 `assets/` 目录中。文章没有转载网站照片或已发表论文中的图表。

## CAD 插图

图片 01–08 根据用户提供的 R3 STEP 几何模型制作，使用 CadQuery/Open CASCADE 网格化和 VTK 渲染。保留了原模型的颜色。针对子系统视图隐藏了无关部件，所展示的几何形状没有重新设计。裁剪了渲染窗口中的留白，并按版式调整了视图比例。图片加入了标题栏和状态页脚。

这些图片属于 CAD 可视化，呈现的是几何模型，不代表照片、已生成的 CFD 流场、实测温度分布、优化设计或加工图纸。叶片和轴承相关特征仍属于参考重建。图片中可见的名义间隙不得解读为已批准的运行间隙。

| 本地图片 | 内容 | 几何来源 |
|---|---|---|
| `01-kj66-r3-cutaway.png` | 整体四分之三剖视图 | `KJ66_R3_ASSEMBLED_3QUARTER.step` |
| `02-shaft-bearings-lubrication.png` | 轴、支撑和润滑区域 | 同一剖视文件；隐藏其他部件 |
| `03-compressor-diffuser.png` | 压气机、罩壳和扩压器区域 | 同一剖视文件；隐藏其他部件 |
| `04-combustor-fuel-routes.png` | 燃烧室、蒸发管和燃油回路 | 同一剖视文件；隐藏其他部件 |
| `05-compressor-cover-clearance.png` | 压气机与罩壳接口 | 同一剖视文件；隐藏其他部件 |
| `06-turbine-nozzle.png` | 导向叶片、涡轮和排气段 | 同一剖视文件；隐藏其他部件 |
| `07-casing-and-supports.png` | 机匣、轴隧道和支撑特征 | 同一剖视文件；隐藏其他部件 |
| `08-impeller-diffuser-full.png` | 完整叶轮和扩压器级 | `KJ66_R3_ASSEMBLY.step`；隐藏罩壳和其他部件 |

建议署名：**“根据所提供的 KJ66 R3 重建模型制作的项目 CAD 可视化；图中几何形状仅供审阅，不构成工程发布版本。”**

尚未独立核实原始图纸以及所提供 CAD 背后的任何第三方权利。本资料包不会为这些底层材料授予新许可，也不保证其所有权。发布时，项目所有者应保留适当的来源致谢。

## 研究数据图表

- `09-published-compressor-efficiency.png`
- `10-published-compressor-pressure-ratio.png`

这些图表是重新绘制的柱状图，没有复制或描摹出版商的原图。数值来源：Junting Xiang、Jörg Uwe Schlüter 和 Fei Duan，《Study of KJ-66 micro gas turbine compressor: Steady and unsteady Reynolds-averaged Navier–Stokes approach》，期刊 2017 年卷期，首次在线发布于 2016 年。[DOI: 10.1177/0954410016644632](https://journals.sagepub.com/doi/10.1177/0954410016644632)。

图表和文章图注都应保留来源署名，以及关于转速线最大值和 R3 状态的警示。底层数值记录在 `data/published-compressor-peaks.json` 中。

## 早期网站图片

此前讨论的 Max Prototypes 图片**不在 `assets/` 中**。这些图片下载失败，且没有核实转载许可。链接见 `REFERENCE_PHOTOS.md`。描述这些图片时，不应将其称为本项目的照片。
