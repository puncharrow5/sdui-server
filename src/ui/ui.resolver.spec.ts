import { Test, TestingModule } from '@nestjs/testing';
import { UiResolver } from './ui.resolver';
import { UiService } from './ui.service';

describe('UiResolver', () => {
  let resolver: UiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UiResolver, UiService],
    }).compile();

    resolver = module.get<UiResolver>(UiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
