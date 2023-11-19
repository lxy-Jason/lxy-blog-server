import getCurrentTime from './getCurrentTime';

describe('getCurrentTime', () => {
  it('should return the current time in the expected format', () => {
    const expectedFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    const currentTime = getCurrentTime();
    expect(currentTime).toMatch(expectedFormat);
  });
});
