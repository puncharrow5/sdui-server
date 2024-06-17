import { registerEnumType } from '@nestjs/graphql';
import { ComponentType } from '@prisma/client';

registerEnumType(ComponentType, {
  name: 'ComponentType',
  description: '컴포넌트 종류',
  valuesMap: {
    Header: { description: '헤더' },
    Popup: { description: '팝업' },
    Section: { description: '섹션' },
    Footer: { description: '푸터' },
  },
});
