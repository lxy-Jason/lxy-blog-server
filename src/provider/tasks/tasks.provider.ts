import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { ArticleProvider } from '../article/article.provider';

@Injectable()
export class TasksProvider {
  private readonly logger = new Logger(TasksProvider.name);

  constructor(private readonly articleProvider: ArticleProvider) {}

  @Cron('0 0 0 * * *')
  async handleCron() {
    await this.articleProvider.setArticleByPath();
    this.logger.debug('定时文章更新');
  }

  // @Cron('0 * * * * *')
  // async handleCron11() {
  //   this.logger.debug('定时任务测试1分钟执行一次');
  // }

  //
  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }
  //
  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
