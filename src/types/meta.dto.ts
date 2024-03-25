export class AboutDto {
  updatedAt: Date;
  content: string;
}

export class LinkItem {
  updatedAt: Date;
  url: string;
  name: string;
  desc: string;
  logo: string;
}
export class LinkDto {
  url: string;
  name: string;
  desc: string;
  logo: string;
}
export class RewardItem {
  updatedAt: Date;
  value: string;
  name: string;
}
export class RewardDto {
  value: string;
  name: string;
}

export class SiteInfo {
  author: string;
  authorLogo: string;
  authorLogoDark: string;
  authorDesc: string;
  siteLogo: string;
  siteLogoDark: string;
  favicon: string;
  siteName: string;
  siteDesc: string;
  beianNumber: string;
  beianUrl: string;
  gaBeianNumber: string;
  gaBeianUrl: string;
  gaBeianLogoUrl: string;
  payAliPay: string;
  payWechat: string;
  payAliPayDark: string;
  payWechatDark: string;
  since: Date;
  baseUrl: string;
  gaAnalysisId: string;
  baiduAnalysisId: string;
  copyrightAggreement: string;
  enableComment?: 'true' | 'false';
  showSubMenu?: 'true' | 'false';
  headerLeftContent?: 'siteLogo' | 'siteName';
  subMenuOffset: number;
  showAdminButton: 'true' | 'false';
  showDonateInfo: 'true' | 'false';
  showFriends: 'true' | 'false';
  showCopyRight: 'true' | 'false';
  showDonateButton: 'true' | 'false';
  showDonateInAbout: 'true' | 'false';
  allowOpenHiddenPostByUrl: 'true' | 'false';
  defaultTheme: 'auto' | 'dark' | 'light';
  enableCustomizing: 'true' | 'false';
  showRSS: 'true' | 'false';
  openArticleLinksInNewWindow: 'true' | 'false';
  showExpirationReminder?: 'true' | 'false';
  showEditButton?: 'true' | 'false';
}
export interface updateUserDto {
  username: string;
  password: string;
}
export type UpdateSiteInfoDto = Partial<SiteInfo> | Partial<updateUserDto>;
export type SocialType = 'bilibili' | 'email' | 'github' | 'gitee' | 'wechat' | 'wechat-dark';
export class SocialItem {
  updatedAt: Date;
  value: string;
  type: SocialType;
}
export class SocialDto {
  value: string;
  type: SocialType;
}
export interface MenuItem {
  id: number;
  name: string;
  value: string;
  level: number;
  children?: MenuItem;
}
export const defaultMenu: MenuItem[] = [
  {
    id: 0,
    name: '首页',
    value: '/',
    level: 0,
  },
  {
    id: 1,
    name: '标签',
    value: '/tag',
    level: 0,
  },
  {
    id: 2,
    name: '分类',
    value: '/category',
    level: 0,
  },
  {
    id: 3,
    name: '时间线',
    value: '/timeline',
    level: 0,
  },
  {
    id: 4,
    name: '友链',
    value: '/link',
    level: 0,
  },
  {
    id: 5,
    name: '关于',
    value: '/about',
    level: 0,
  },
];
