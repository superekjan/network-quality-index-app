/**
 * 户型图配置文件
 * 房间模块定义 + localStorage 持久化
 * 画布统一 viewBox 0 0 400 400，网格 20×20，每格 20px
 */

// ============ localStorage 键名 ============
const FLOORPLAN_STORAGE_KEY = 'floorplan_layout';
const FLOORPLAN_ROUTERS_KEY = 'floorplan_routers';

// 路由器设备定义
const ROUTER_DEVICES = [
  { id: 'router1', name: '主路由', model: 'AX3600', status: 'online', coverageRadius: 100, color: 'rgba(22,119,255,0.08)' }
];

// ============ 房间模块定义 ============
// 每个模块：id, name, icon(SVG线性图标), defaultW, defaultH, color, minW, minH
const ROOM_MODULES = [
  { id: 'living',   name: '客厅',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4"/><path d="M2 12v4a2 2 0 002 2h16a2 2 0 002-2v-4"/><path d="M6 18v2"/><path d="M18 18v2"/></svg>', defaultW: 5, defaultH: 4, color: 'rgba(22,119,255,0.12)', border: 'rgba(22,119,255,0.3)', minW: 3, minH: 3 },
  { id: 'master',   name: '主卧',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/><path d="M12 6v4"/></svg>', defaultW: 4, defaultH: 4, color: 'rgba(126,184,216,0.12)', border: 'rgba(126,184,216,0.3)', minW: 3, minH: 3 },
  { id: 'second',   name: '次卧',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M3 11h18"/><path d="M12 7v4"/></svg>', defaultW: 3, defaultH: 3, color: 'rgba(140,197,160,0.12)', border: 'rgba(140,197,160,0.3)', minW: 2, minH: 2 },
  { id: 'kitchen',  name: '厨房',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M5 7h4"/><path d="M5 11h4"/><path d="M13 3v6a2 2 0 002 2h2a2 2 0 002-2V3"/><path d="M15 3v8"/><path d="M19 3v18"/></svg>', defaultW: 2, defaultH: 2, color: 'rgba(212,165,116,0.12)', border: 'rgba(212,165,116,0.3)', minW: 2, minH: 2 },
  { id: 'bathroom', name: '卫生间', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M4 12v2a6 6 0 0012 0v-2"/><path d="M10 12V6a2 2 0 00-2-2H6"/><circle cx="16" cy="5" r="1"/></svg>', defaultW: 2, defaultH: 2, color: 'rgba(212,136,122,0.12)', border: 'rgba(212,136,122,0.3)', minW: 2, minH: 2 },
  { id: 'study',    name: '书房',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="13" y2="11"/></svg>', defaultW: 3, defaultH: 3, color: 'rgba(160,158,154,0.12)', border: 'rgba(160,158,154,0.3)', minW: 2, minH: 2 },
  { id: 'dining',   name: '餐厅',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>', defaultW: 3, defaultH: 3, color: 'rgba(212,165,116,0.10)', border: 'rgba(212,165,116,0.25)', minW: 2, minH: 2 },
  { id: 'balcony',  name: '阳台',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6"/><path d="M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4"/><line x1="8" y1="12" x2="8" y2="20"/><line x1="12" y1="12" x2="12" y2="20"/><line x1="16" y1="12" x2="16" y2="20"/></svg>', defaultW: 5, defaultH: 1, color: 'rgba(22,119,255,0.06)', border: 'rgba(22,119,255,0.15)', minW: 2, minH: 1 },
  { id: 'entry',    name: '玄关',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4v16"/><path d="M5 4h10a2 2 0 012 2v12a2 2 0 01-2 2H5"/><path d="M9 12h2"/><circle cx="14" cy="12" r="1"/></svg>', defaultW: 2, defaultH: 2, color: 'rgba(174,174,178,0.10)', border: 'rgba(174,174,178,0.25)', minW: 1, minH: 1 },
  { id: 'storage',  name: '储物间', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="15"/><line x1="15" y1="9" x2="15" y2="15"/></svg>', defaultW: 2, defaultH: 1, color: 'rgba(174,174,178,0.08)', border: 'rgba(174,174,178,0.20)', minW: 1, minH: 1 },
  { id: 'generic',  name: '新房间', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>', defaultW: 3, defaultH: 3, color: 'rgba(22,119,255,0.10)', border: 'rgba(22,119,255,0.25)', minW: 2, minH: 2 }
];

// 网格参数
const GRID_SIZE = 20;       // 每格像素
const GRID_COLS = 18;       // 列数（留边距）
const GRID_ROWS = 18;       // 行数
const GRID_OFFSET_X = 20;   // 画布内偏移
const GRID_OFFSET_Y = 20;

// ============ localStorage 操作 ============

// 获取保存的户型布局
function getFloorplanLayout() {
  const saved = localStorage.getItem(FLOORPLAN_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  // 返回默认布局（两室一厅）
  return getDefaultLayout();
}

// 保存户型布局
function saveFloorplanLayout(layout) {
  localStorage.setItem(FLOORPLAN_STORAGE_KEY, JSON.stringify(layout));
}

// 获取所有路由器位置
function getRouterPositions() {
  const saved = localStorage.getItem(FLOORPLAN_ROUTERS_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  // 默认：主路由在客厅
  return [
    { id: 'router1', x: 180, y: 300 }
  ];
}

// 保存所有路由器位置
function saveRouterPositions(positions) {
  localStorage.setItem(FLOORPLAN_ROUTERS_KEY, JSON.stringify(positions));
}

// 获取单个路由器位置（兼容旧接口）
function getRouterPosition() {
  const positions = getRouterPositions();
  return positions[0] || { x: 180, y: 300 };
}

// 保存单个路由器位置（兼容旧接口）
function saveRouterPosition(pos) {
  const positions = getRouterPositions();
  positions[0] = { ...positions[0], ...pos };
  saveRouterPositions(positions);
}

// ============ 默认布局 ============
function getDefaultLayout() {
  return {
    rooms: [
      { moduleId: 'living',   name: '客厅', x: 5,  y: 9,  w: 5, h: 4 },
      { moduleId: 'master',   name: '主卧', x: 10, y: 1,  w: 4, h: 4 },
      { moduleId: 'second',   name: '次卧', x: 10, y: 5,  w: 4, h: 3 },
      { moduleId: 'kitchen',  name: '厨房', x: 1,  y: 1,  w: 3, h: 2 },
      { moduleId: 'bathroom', name: '卫生间', x: 1,  y: 3,  w: 3, h: 2 },
      { moduleId: 'bathroom', name: '卫生间', x: 10, y: 8,  w: 4, h: 2 },
      { moduleId: 'entry',    name: '玄关', x: 1,  y: 9,  w: 3, h: 4 },
      { moduleId: 'balcony',  name: '阳台', x: 1,  y: 0,  w: 17, h: 1 }
    ],
    walls: []
  };
}

// ============ 预设模板 ============
// 参考常用户型图设计：白色立体墙体围合房间，浅蓝色房间区域
// 网格 18×18，坐标从 (1,1) 开始，留出边距
// 墙体形成连续封闭轮廓，内墙分隔功能区
// 画布 18×18 格，模板使用完整画布尺寸，坐标 0~17
function getPresetLayout(type) {
  const presets = {
    // 一房一厅：南向阳台，客厅居中，卧室右侧，厨卫玄关北侧
    '1bed1living': {
      rooms: [
        { moduleId: 'balcony',  name: '阳台',   x: 1,  y: 1,  w: 16, h: 1 },
        { moduleId: 'living',   name: '客厅',   x: 1,  y: 2,  w: 9,  h: 7 },
        { moduleId: 'master',   name: '卧室',   x: 10, y: 2,  w: 7,  h: 7 },
        { moduleId: 'kitchen',  name: '厨房',   x: 1,  y: 9,  w: 5,  h: 4 },
        { moduleId: 'bathroom', name: '卫生间', x: 6,  y: 9,  w: 4,  h: 4 },
        { moduleId: 'entry',    name: '玄关',   x: 10, y: 9,  w: 7,  h: 4 }
      ],
      walls: [
        // 外墙
        { x1: 1, y1: 1, x2: 17, y2: 1 },
        { x1: 1, y1: 13, x2: 17, y2: 13 },
        { x1: 1, y1: 1, x2: 1, y2: 13 },
        { x1: 17, y1: 1, x2: 17, y2: 13 },
        // 阳台/房间分隔
        { x1: 1, y1: 2, x2: 17, y2: 2 },
        // 客厅/卧室竖墙
        { x1: 10, y1: 2, x2: 10, y2: 9 },
        // 上区/下区横墙
        { x1: 1, y1: 9, x2: 17, y2: 9 },
        // 厨房/卫生间竖墙
        { x1: 6, y1: 9, x2: 6, y2: 13 },
        // 卫生间/玄关竖墙
        { x1: 10, y1: 9, x2: 10, y2: 13 }
      ]
    },

    // 两房一厅：南向阳台，两卧室+客厅并列，厨卫玄关北侧
    '2bed1living': {
      rooms: [
        { moduleId: 'balcony',  name: '阳台',   x: 1,  y: 1,  w: 16, h: 1 },
        { moduleId: 'second',   name: '次卧',   x: 1,  y: 2,  w: 5,  h: 6 },
        { moduleId: 'living',   name: '客厅',   x: 6,  y: 2,  w: 6,  h: 6 },
        { moduleId: 'master',   name: '主卧',   x: 12, y: 2,  w: 5,  h: 6 },
        { moduleId: 'kitchen',  name: '厨房',   x: 1,  y: 8,  w: 5,  h: 4 },
        { moduleId: 'bathroom', name: '卫生间', x: 6,  y: 8,  w: 4,  h: 4 },
        { moduleId: 'entry',    name: '玄关',   x: 10, y: 8,  w: 7,  h: 4 }
      ],
      walls: [
        // 外墙
        { x1: 1, y1: 1, x2: 17, y2: 1 },
        { x1: 1, y1: 12, x2: 17, y2: 12 },
        { x1: 1, y1: 1, x2: 1, y2: 12 },
        { x1: 17, y1: 1, x2: 17, y2: 12 },
        // 阳台/房间分隔
        { x1: 1, y1: 2, x2: 17, y2: 2 },
        // 次卧/客厅竖墙
        { x1: 6, y1: 2, x2: 6, y2: 8 },
        // 客厅/主卧竖墙
        { x1: 12, y1: 2, x2: 12, y2: 8 },
        // 上区/下区横墙
        { x1: 1, y1: 8, x2: 17, y2: 8 },
        // 厨房/卫生间竖墙
        { x1: 6, y1: 8, x2: 6, y2: 12 },
        // 卫生间/玄关竖墙
        { x1: 10, y1: 8, x2: 10, y2: 12 }
      ]
    },

    // 三房一厅：南向阳台，三卧室+卫生间并列，客厅+厨房+玄关下方
    '3bed1living': {
      rooms: [
        { moduleId: 'balcony',  name: '阳台',   x: 1,  y: 1,  w: 16, h: 1 },
        { moduleId: 'second',   name: '次卧',   x: 1,  y: 2,  w: 5,  h: 6 },
        { moduleId: 'master',   name: '主卧',   x: 6,  y: 2,  w: 5,  h: 6 },
        { moduleId: 'study',    name: '书房',   x: 11, y: 2,  w: 3,  h: 6 },
        { moduleId: 'bathroom', name: '卫生间', x: 14, y: 2,  w: 3,  h: 6 },
        { moduleId: 'living',   name: '客厅',   x: 1,  y: 8,  w: 9,  h: 5 },
        { moduleId: 'kitchen',  name: '厨房',   x: 10, y: 8,  w: 4,  h: 5 },
        { moduleId: 'entry',    name: '玄关',   x: 14, y: 8,  w: 3,  h: 5 }
      ],
      walls: [
        // 外墙
        { x1: 1, y1: 1, x2: 17, y2: 1 },
        { x1: 1, y1: 13, x2: 17, y2: 13 },
        { x1: 1, y1: 1, x2: 1, y2: 13 },
        { x1: 17, y1: 1, x2: 17, y2: 13 },
        // 阳台/房间分隔
        { x1: 1, y1: 2, x2: 17, y2: 2 },
        // 次卧/主卧竖墙
        { x1: 6, y1: 2, x2: 6, y2: 8 },
        // 主卧/书房竖墙
        { x1: 11, y1: 2, x2: 11, y2: 8 },
        // 书房/卫生间竖墙
        { x1: 14, y1: 2, x2: 14, y2: 8 },
        // 上区/下区横墙
        { x1: 1, y1: 8, x2: 17, y2: 8 },
        // 客厅/厨房竖墙
        { x1: 10, y1: 8, x2: 10, y2: 13 },
        // 厨房/玄关竖墙
        { x1: 14, y1: 8, x2: 14, y2: 13 }
      ]
    },

    // 三房两厅：南向阳台，三卧室+卫生间上排，客厅+餐厅+厨房+玄关下排
    '3bed2living': {
      rooms: [
        { moduleId: 'balcony',  name: '阳台',   x: 1,  y: 1,  w: 16, h: 1 },
        { moduleId: 'second',   name: '次卧',   x: 1,  y: 2,  w: 5,  h: 6 },
        { moduleId: 'master',   name: '主卧',   x: 6,  y: 2,  w: 5,  h: 6 },
        { moduleId: 'study',    name: '书房',   x: 11, y: 2,  w: 3,  h: 6 },
        { moduleId: 'bathroom', name: '卫生间', x: 14, y: 2,  w: 3,  h: 6 },
        { moduleId: 'living',   name: '客厅',   x: 1,  y: 8,  w: 6,  h: 5 },
        { moduleId: 'dining',   name: '餐厅',   x: 7,  y: 8,  w: 4,  h: 5 },
        { moduleId: 'kitchen',  name: '厨房',   x: 11, y: 8,  w: 3,  h: 5 },
        { moduleId: 'entry',    name: '玄关',   x: 14, y: 8,  w: 3,  h: 5 }
      ],
      walls: [
        // 外墙
        { x1: 1, y1: 1, x2: 17, y2: 1 },
        { x1: 1, y1: 13, x2: 17, y2: 13 },
        { x1: 1, y1: 1, x2: 1, y2: 13 },
        { x1: 17, y1: 1, x2: 17, y2: 13 },
        // 阳台/房间分隔
        { x1: 1, y1: 2, x2: 17, y2: 2 },
        // 次卧/主卧竖墙
        { x1: 6, y1: 2, x2: 6, y2: 8 },
        // 主卧/书房竖墙
        { x1: 11, y1: 2, x2: 11, y2: 8 },
        // 书房/卫生间竖墙
        { x1: 14, y1: 2, x2: 14, y2: 8 },
        // 上区/下区横墙
        { x1: 1, y1: 8, x2: 17, y2: 8 },
        // 客厅/餐厅竖墙
        { x1: 7, y1: 8, x2: 7, y2: 13 },
        // 餐厅/厨房竖墙
        { x1: 11, y1: 8, x2: 11, y2: 13 },
        // 厨房/玄关竖墙
        { x1: 14, y1: 8, x2: 14, y2: 13 }
      ]
    }
  };
  return presets[type] || presets['2bed1living'];
}

// ============ SVG 生成函数 ============

// 获取房间模块定义
function getRoomModule(moduleId) {
  return ROOM_MODULES.find(m => m.id === moduleId) || ROOM_MODULES[0];
}

// 生成单个房间的SVG矩形（用于各页面渲染）
function generateRoomSvg(room, options = {}) {
  const mod = getRoomModule(room.moduleId);
  const roomName = room.name || mod.name;
  const x = GRID_OFFSET_X + room.x * GRID_SIZE;
  const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
  const w = room.w * GRID_SIZE;
  const h = room.h * GRID_SIZE;

  const showLabel = options.showLabel !== false;
  const labelSize = options.labelSize || 10;
  const labelColor = options.labelColor || 'var(--text-primary)';

  let svg = '';
  // 房间矩形（浅蓝色背景，无边框）
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(210,228,245,0.35)" stroke="none" rx="3"/>`;
  // 房间名
  if (showLabel) {
    svg += `<text x="${x + w/2}" y="${y + h/2}" font-family="Inter,sans-serif" font-size="${labelSize}" font-weight="500" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">${roomName}</text>`;
  }
  return svg;
}

// 生成完整户型图SVG内容（网络状态页用，含热力图+路由器标记）
function generateFloorplanSvg(layout, options = {}) {
  const rooms = layout.rooms || [];
  let svg = '';

  // 生成clipPath（所有房间的联合区域，热力图只在房间内显示）
  svg += `<clipPath id="roomsClip">`;
  rooms.forEach((room, i) => {
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  });
  svg += `</clipPath>`;

  // 热力图层（根据与最近路由器距离使用不同渐变色，裁剪到房间范围内）
  if (options.showHeatmap !== false) {
    svg += `<g clip-path="url(#roomsClip)">`;
    const routerPositions = getRouterPositions();
    rooms.forEach(room => {
      const cx = GRID_OFFSET_X + (room.x + room.w/2) * GRID_SIZE;
      const cy = GRID_OFFSET_Y + (room.y + room.h/2) * GRID_SIZE;
      const rx = room.w * GRID_SIZE / 2 + 10;
      const ry = room.h * GRID_SIZE / 2 + 10;
      // 找最近的路由器距离
      let minDist = Infinity;
      routerPositions.forEach(rp => {
        const dist = Math.sqrt((cx - rp.x) ** 2 + (cy - rp.y) ** 2);
        if (dist < minDist) minDist = dist;
      });
      let gradId;
      if (minDist < 80) gradId = 'hm1';
      else if (minDist < 150) gradId = 'hm2';
      else if (minDist < 220) gradId = 'hm3';
      else gradId = 'hm4';
      svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${gradId})" opacity="0.6"/>`;
    });
    svg += `</g>`;
  }

  // 房间（透明背景，无边框）
  rooms.forEach(room => {
    const mod = getRoomModule(room.moduleId);
    const roomName = room.name || mod.name;
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;

    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(210,228,245,0.35)" stroke="none" rx="3"/>`;
    // 房间名
    const showLabel = options.showLabel !== false;
    if (showLabel) {
      svg += `<text x="${x + w/2}" y="${y + h/2}" font-family="Inter,sans-serif" font-size="${options.labelSize || 10}" font-weight="500" fill="${options.labelColor || 'var(--text-primary)'}" text-anchor="middle" dominant-baseline="middle">${roomName}</text>`;
    }
  });

  // 墙体（3D立体效果：底部阴影→侧边暗面→顶面亮面→高光）
  const walls = layout.walls || [];
  walls.forEach(wall => {
    const x1 = GRID_OFFSET_X + wall.x1 * GRID_SIZE;
    const y1 = GRID_OFFSET_Y + wall.y1 * GRID_SIZE;
    const x2 = GRID_OFFSET_X + wall.x2 * GRID_SIZE;
    const y2 = GRID_OFFSET_Y + wall.y2 * GRID_SIZE;
    // 底部投影
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.08)" stroke-width="9" stroke-linecap="square" transform="translate(0,2)"/>`;
    // 侧边暗面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(160,170,185,0.6)" stroke-width="7" stroke-linecap="square"/>`;
    // 顶面亮面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(240,243,248,0.95)" stroke-width="5" stroke-linecap="square"/>`;
    // 顶部高光
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.9)" stroke-width="2" stroke-linecap="square" transform="translate(0,-1)"/>`;
  });

  // 路由器标记
  if (options.showRouter !== false) {
    const routerPos = getRouterPosition();
    svg += `<circle cx="${routerPos.x}" cy="${routerPos.y}" r="8" fill="rgba(22,119,255,0.3)" stroke="var(--accent-cyan)" stroke-width="1.5"/>`;
    svg += `<circle cx="${routerPos.x}" cy="${routerPos.y}" r="3" fill="var(--accent-cyan)"/>`;
  }

  return svg;
}

// 生成首页SVG（含连接线和光点动画）
function generateHomeSvg(layout) {
  const rooms = layout.rooms || [];
  const routerPositions = getRouterPositions();
  const mainRouter = routerPositions[0] || { x: 180, y: 300 };
  let svg = '';

  // 生成clipPath（所有房间的联合区域，热力图只在房间内显示）
  svg += `<clipPath id="roomsClip">`;
  rooms.forEach((room, i) => {
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  });
  svg += `</clipPath>`;

  // 热力图底层（裁剪到房间范围内）
  svg += `<g clip-path="url(#roomsClip)">`;
  rooms.forEach(room => {
    const cx = GRID_OFFSET_X + (room.x + room.w/2) * GRID_SIZE;
    const cy = GRID_OFFSET_Y + (room.y + room.h/2) * GRID_SIZE;
    const rx = room.w * GRID_SIZE / 2 + 5;
    const ry = room.h * GRID_SIZE / 2 + 5;
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#heatmap1)" opacity="0.5"/>`;
  });
  svg += `</g>`;

  // 房间（透明背景，无边框）
  rooms.forEach(room => {
    const mod = getRoomModule(room.moduleId);
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;

    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(210,228,245,0.35)" stroke="none" rx="3"/>`;
    svg += `<text x="${x + w/2}" y="${y + h/2}" font-family="Inter,sans-serif" font-size="10" font-weight="500" fill="var(--text-primary)" text-anchor="middle" dominant-baseline="middle">${room.name || mod.name}</text>`;
  });

  // 连接线（从主路由到各房间）
  svg += '<g class="connection-lines">';
  rooms.forEach(room => {
    const cx = GRID_OFFSET_X + (room.x + room.w/2) * GRID_SIZE;
    const cy = GRID_OFFSET_Y + (room.y + room.h/2) * GRID_SIZE;
    svg += `<line x1="${mainRouter.x}" y1="${mainRouter.y}" x2="${cx}" y2="${cy}" stroke="rgba(22,119,255,0.10)" stroke-width="1"/>`;
  });
  svg += '</g>';

  // 光点动画
  rooms.forEach((room, i) => {
    const cx = GRID_OFFSET_X + (room.x + room.w/2) * GRID_SIZE;
    const cy = GRID_OFFSET_Y + (room.y + room.h/2) * GRID_SIZE;
    const dur = 3 + i * 0.5;
    const delay = i * 0.3;
    svg += `<circle r="2" class="traveling-dot" filter="url(#dotGlow)">
      <animateMotion dur="${dur}s" repeatCount="indefinite" path="M${mainRouter.x},${mainRouter.y} L${cx},${cy}" begin="${delay}s"/>
      <animate attributeName="opacity" values="0;1;1;0" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>
    </circle>`;
  });

  return svg;
}

// 生成路由器位置页SVG（不含路由器标记和覆盖圆，由页面动态生成）
// 房间统一透明背景+灰色边框，并生成clipPath供热力图裁剪
function generateRouterSvg(layout) {
  const rooms = layout.rooms || [];
  const walls = layout.walls || [];
  let svg = '';

  // 生成clipPath（所有房间的联合区域）
  svg += `<clipPath id="roomsClip">`;
  rooms.forEach((room, i) => {
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  });
  svg += `</clipPath>`;

  // 房间（透明背景，无边框）
  rooms.forEach(room => {
    const mod = getRoomModule(room.moduleId);
    const roomName = room.name || mod.name;
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;

    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(210,228,245,0.35)" stroke="none" rx="3"/>`;
    // 房间名
    svg += `<text x="${x + w/2}" y="${y + h/2}" font-family="Inter,sans-serif" font-size="10" font-weight="500" fill="var(--text-primary)" text-anchor="middle" dominant-baseline="middle">${roomName}</text>`;
  });

  // 墙体
  walls.forEach(wall => {
    const x1 = GRID_OFFSET_X + wall.x1 * GRID_SIZE;
    const y1 = GRID_OFFSET_Y + wall.y1 * GRID_SIZE;
    const x2 = GRID_OFFSET_X + wall.x2 * GRID_SIZE;
    const y2 = GRID_OFFSET_Y + wall.y2 * GRID_SIZE;
    // 底部投影
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.08)" stroke-width="9" stroke-linecap="square" transform="translate(0,2)"/>`;
    // 侧边暗面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(160,170,185,0.6)" stroke-width="7" stroke-linecap="square"/>`;
    // 顶面亮面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(240,243,248,0.95)" stroke-width="5" stroke-linecap="square"/>`;
    // 顶部高光
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.9)" stroke-width="2" stroke-linecap="square" transform="translate(0,-1)"/>`;
  });

  return svg;
}

// 生成缩略图SVG（用于设置页预览等）
function generateThumbSvg(layout) {
  const rooms = layout.rooms || [];
  const walls = layout.walls || [];
  let svg = '';
  // 房间（透明背景，无边框）
  rooms.forEach(room => {
    const mod = getRoomModule(room.moduleId);
    const roomName = room.name || mod.name;
    const x = GRID_OFFSET_X + room.x * GRID_SIZE;
    const y = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const w = room.w * GRID_SIZE;
    const h = room.h * GRID_SIZE;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(210,228,245,0.35)" stroke="none" rx="3"/>`;
    svg += `<text x="${x + w/2}" y="${y + h/2}" font-family="Inter,sans-serif" font-size="7" font-weight="400" fill="rgba(142,142,147,0.5)" text-anchor="middle" dominant-baseline="middle">${roomName}</text>`;
  });
  // 墙体
  walls.forEach(wall => {
    const x1 = GRID_OFFSET_X + wall.x1 * GRID_SIZE;
    const y1 = GRID_OFFSET_Y + wall.y1 * GRID_SIZE;
    const x2 = GRID_OFFSET_X + wall.x2 * GRID_SIZE;
    const y2 = GRID_OFFSET_Y + wall.y2 * GRID_SIZE;
    // 底部投影
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,0,0.08)" stroke-width="9" stroke-linecap="square" transform="translate(0,2)"/>`;
    // 侧边暗面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(160,170,185,0.6)" stroke-width="7" stroke-linecap="square"/>`;
    // 顶面亮面
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(240,243,248,0.95)" stroke-width="5" stroke-linecap="square"/>`;
    // 顶部高光
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.9)" stroke-width="2" stroke-linecap="square" transform="translate(0,-1)"/>`;
  });
  return svg;
}

// 根据布局计算信号数据
function calculateSignalData(layout) {
  const routerPositions = getRouterPositions();
  const rooms = layout.rooms || [];
  let good = 0, fair = 0, poor = 0;
  const signalRooms = [];

  rooms.forEach(room => {
    const mod = getRoomModule(room.moduleId);
    const cx = GRID_OFFSET_X + (room.x + room.w/2) * GRID_SIZE;
    const cy = GRID_OFFSET_Y + (room.y + room.h/2) * GRID_SIZE;
    // 找最近的路由器距离
    let minDist = Infinity;
    routerPositions.forEach(rp => {
      const dist = Math.sqrt((cx - rp.x) ** 2 + (cy - rp.y) ** 2);
      if (dist < minDist) minDist = dist;
    });
    const signal = Math.max(10, Math.round(100 - minDist * 0.25));
    let cls;
    if (signal >= 75) { cls = 'signal-excellent'; good++; }
    else if (signal >= 50) { cls = 'signal-good'; good++; }
    else if (signal >= 30) { cls = 'signal-fair'; fair++; }
    else { cls = 'signal-poor'; poor++; }
    signalRooms.push({ name: room.name || mod.name, signal, cls });
  });

  const total = rooms.length || 1;
  const coverage = Math.round((good / total) * 100);
  return { signalRooms, stats: { coverage: coverage + '%', good, fair } };
}

// ============ 信号强度热力图 ============
// 根据信号强度生成绿(强)→黄(中)→红(弱/无)渐变热力图
// 使用Canvas渲染，返回data URL，支持实时更新
function generateSignalHeatmapDataUrl(layout, customRouters) {
  const rooms = layout.rooms || [];
  // 如果传入自定义路由器列表，直接使用（已过滤）；否则从全局获取并过滤在线的
  let onlineRouters;
  if (customRouters) {
    onlineRouters = customRouters;
  } else {
    const routerPositions = getRouterPositions();
    onlineRouters = routerPositions.filter((rp, i) => {
      const device = ROUTER_DEVICES[i];
      return device && device.status === 'online';
    });
  }

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  if (onlineRouters.length === 0) return canvas.toDataURL();

  const step = 3; // 采样步长

  rooms.forEach(room => {
    const rx = GRID_OFFSET_X + room.x * GRID_SIZE;
    const ry = GRID_OFFSET_Y + room.y * GRID_SIZE;
    const rw = room.w * GRID_SIZE;
    const rh = room.h * GRID_SIZE;

    for (let py = ry; py < ry + rh; py += step) {
      for (let px = rx; px < rx + rw; px += step) {
        let minDist = Infinity;
        onlineRouters.forEach(rp => {
          const dist = Math.sqrt((px - rp.x) ** 2 + (py - rp.y) ** 2);
          if (dist < minDist) minDist = dist;
        });

        const maxRange = 200;
        const signal = Math.max(0, Math.min(1, 1 - minDist / maxRange));

        let r, g, b;
        if (signal < 0.5) {
          // 弱(红) → 中(琥珀): #ef4444 → #f59e0b
          const t = signal / 0.5;
          r = Math.round(239 + (245 - 239) * t);
          g = Math.round(68 + (158 - 68) * t);
          b = Math.round(68 + (11 - 68) * t);
        } else {
          // 中(琥珀) → 强(绿): #f59e0b → #22c55e
          const t = (signal - 0.5) / 0.5;
          r = Math.round(245 + (34 - 245) * t);
          g = Math.round(158 + (197 - 158) * t);
          b = Math.round(11 + (94 - 11) * t);
        }

        const alpha = signal < 0.1 ? 0.15 : (0.15 + signal * 0.35);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
        ctx.fillRect(px, py, step, step);
      }
    }
  });

  return canvas.toDataURL();
}

// 生成SVG格式的热力图（用于静态页面）
function generateSignalHeatmapSvg(layout) {
  const dataUrl = generateSignalHeatmapDataUrl(layout);
  return `<image href="${dataUrl}" x="0" y="0" width="400" height="400"/>`;
}
