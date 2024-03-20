import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MetaDocument } from 'src/schema/meta.schema';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UpdateSiteInfoDto } from '../../types/meta.dto';

@Injectable() //装饰器，用于表示该类可以被依赖注入系统进行管理
export class MetaProvider {
  logger = new Logger(MetaProvider.name); //用于日志记录的工具类。
  constructor(@InjectModel('Meta') private metaModel: Model<MetaDocument>) {}
  // 获取站点信息
  async getSiteInfo() {
    const res = await this.metaModel.findOne().exec()
    return res?.siteInfo
  }
  // 更新站点信息
  async updateSiteInfo(updateSiteInfoDto: UpdateSiteInfoDto) {
    // @ts-ignore eslint-disable-next-line @typescript-eslint/ban-ts-comment ????
    const {...updateDto } = updateSiteInfoDto;
    const oldSiteInfo = await this.getSiteInfo();
    const res =  await this.metaModel.updateOne({}, { siteInfo: { ...oldSiteInfo, ...updateSiteInfoDto } }, {upsert: true});
    return res
  }

}
