import unfreezeApolloCacheValue from './unfreezeApolloCacheValue';

const document = {
  _id: 'document123',
  isPublic: true,
  userId: 'abc123',
  title: 'Document Title #1',
  body: 'This is my document. There are many like it, but this one is mine.',
  createdAt: '2018-11-05T20:34:54.225Z',
  updatedAt: '2018-11-05T20:34:54.225Z',
  __typename: 'Document',
};

describe('unfreezeApolloCacheValue.js', () => {
  test('it unfreezes a frozen JavaScript Object', () => {
    const frozenObject = Object.freeze({
      ...document,
      __typename: 'Document',
    });

    const unfrozenCacheValue = unfreezeApolloCacheValue(frozenObject);

    const { __typename, ...unfrozenDocument } = document;

    expect(unfrozenCacheValue).toEqual(unfrozenDocument);
  });

  test('it removes __typename field from objects', () => {
    const frozenObject = Object.freeze({
      ...document,
      __typename: 'Document',
    });

    const unfrozenCacheValue = unfreezeApolloCacheValue(frozenObject);

    expect(unfrozenCacheValue.__typename).toBe(undefined); //eslint-disable-line
  });
});
