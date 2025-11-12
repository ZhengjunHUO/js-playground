import { Test, TestingModule } from '@nestjs/testing';
import { WsproxyController } from './wsproxy.controller';

describe('WsproxyController', () => {
  let controller: WsproxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WsproxyController],
    }).compile();

    controller = module.get<WsproxyController>(WsproxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
