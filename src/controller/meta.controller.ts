import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MetaProvider } from '../provider/meta/meta.provider';
import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { UpdateSiteInfoDto } from '../types/meta.dto';

@ApiTags('网站信息接口')
@Controller('/meta/')
export class MetaController {
  constructor(private readonly metaProvider: MetaProvider) {}
  @ApiOperation({
    summary: '获取站点信息',
    description: '获取站点信息',
  })
  @Get('/getSiteInfo')
  async getUserByName() {
    console.log('获取站点信息')
    const data = await this.metaProvider.getSiteInfo();
    console.log(data,'data')
    return {
      code: 200,
      data,
    };
  }
  @ApiOperation({
    summary: '更新站点信息',
    description: '更新站点信息',
  })
  @Post('/updateSiteInfo')
  async addUser(@Body() siteParam:UpdateSiteInfoDto) {
    console.log('更新站点信息')

    const data = await this.metaProvider.updateSiteInfo(siteParam);
    return {
      code: 200,
      data,
    };
  }
}
