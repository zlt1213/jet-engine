export const locales = ['en', 'zh'] as const;
export type Locale = typeof locales[number];
export const tags = ['design', 'cad', 'simulation', 'manufacturing', 'testing'] as const;
export type Tag = typeof tags[number];
export const ui = {
  en: {
    name: 'Jet Engine Notebook', project: 'Project', buildLog: 'Build Log', resources: 'Resources', about: 'About',
    skip: 'Skip to content', latest: 'Latest from the notebook', allUpdates: 'All updates', startHere: 'Start here',
    preview: 'Editorial preview', published: 'Published', updated: 'Updated', readArticle: 'Read the article',
    currentProgress: 'Currently on the workbench', edition: 'A personal engineering project',
    heroTitle: 'A small engine.\nA long way to learn.',
    heroSubtitle: 'Following the questions behind a KJ66-based jet engine project, one drawing, model, and iteration at a time.',
    intro: 'A personal exploration of small turbojet design—from original drawings and CAD reconstruction to analysis, manufacturing and testing.',
    heroAlt: 'Grayscale cutaway render of a jet engine, with the casing opened to reveal the internal assembly.',
    heroCaption: 'Engine cutaway render, showing the casing and internal assembly.',
    logTitle: 'The build log.', logDescription: 'Notes on the questions, decisions, and details that move the project forward.',
    all: 'All entries', entries: 'entries', tagHeading: 'Notes tagged', backToLog: 'Back to the build log',
    notice: 'This article outlines planned work and open questions. Its illustrations are conceptual; no validated CAD, simulation results, or physical test measurements are presented.',
    resourcesTitle: 'The files behind the work.', resourcesDescription: 'Models, drawings, and reference notes, kept with the revision they belong to.',
    emptyTitle: 'No project files released yet.',
    emptyDescription: 'When a revision is ready to share, its files will appear here with a description and a link to the article that explains it.',
    resourcesNote: 'Each release will keep its own revision. Earlier files will stay linked so the project history remains readable.',
    aboutTitle: 'A project worth\nwriting down.', aboutDescription: 'An engineer’s notebook for a small jet engine project.',
    by: 'A notebook by', githubProfile: 'Find me on GitHub', github: 'GitHub', rss: 'RSS feed',
    older: 'Older entry', newer: 'Newer entry', footerText: 'A small project, carefully recorded.',
    tags: { design: 'Design', cad: 'CAD', simulation: 'Simulation', manufacturing: 'Manufacturing', testing: 'Testing' },
  },
  zh: {
    name: '喷气发动机手记', project: '项目', buildLog: '制作日志', resources: '资料', about: '关于',
    skip: '跳至正文', latest: '手记最近更新', allUpdates: '全部更新', startHere: '从这里开始',
    preview: '内容预览', published: '发布于', updated: '更新于', readArticle: '阅读文章',
    currentProgress: '工作台上的下一步', edition: '个人工程项目',
    heroTitle: '一台小发动机。\n一段探索的旅程。',
    heroSubtitle: '围绕 KJ66 小型喷气发动机，记录每张图纸、每个模型与每次迭代背后的问题。',
    intro: '从原始图纸和 CAD 重建出发，记录小型涡喷发动机的分析、制造与测试探索。',
    heroAlt: '喷气发动机灰白色剖视渲染图，剖开的机匣展示内部装配结构。',
    heroCaption: '发动机剖视渲染，展示机匣与内部结构。',
    logTitle: '制作日志。', logDescription: '记录推动项目向前的问题、决定与细节。',
    all: '全部文章', entries: '篇文章', tagHeading: '相关手记', backToLog: '返回制作日志',
    notice: '本文介绍计划开展的工作与待解决的问题。插图用于说明概念；本文未提供经过验证的 CAD 模型、仿真结果或实测数据。',
    resourcesTitle: '工作背后的资料。', resourcesDescription: '模型、图纸与参考记录，按所属版本保存。',
    emptyTitle: '还没有公开发布的项目文件。',
    emptyDescription: '当某个版本准备好分享时，相关文件会在这里列出，并附上说明与对应文章链接。',
    resourcesNote: '每次发布都会保留自己的版本标识，早期文件也会继续保留链接，方便理解项目的变化。',
    aboutTitle: '把探索的过程\n认真记下来。', aboutDescription: '一本记录小型喷气发动机项目的工程手记。',
    by: '手记作者', githubProfile: '在 GitHub 找到我', github: 'GitHub', rss: 'RSS 订阅',
    older: '较早文章', newer: '较新文章', footerText: '一个小项目，一份认真的记录。',
    tags: { design: '设计', cad: 'CAD', simulation: '仿真', manufacturing: '制造', testing: '测试' },
  },
} as const;
export function formatDate(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(value);
}
