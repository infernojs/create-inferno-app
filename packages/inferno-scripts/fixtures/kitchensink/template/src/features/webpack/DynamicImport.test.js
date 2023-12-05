/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from 'inferno';

describe('dynamic import', () => {
  it('renders without crashing', async () => {
    const DynamicImport = (await import('./DynamicImport')).default;
    const div = document.createElement('div');
    render(<DynamicImport />, div);
    expect(div.textContent).toBe('Hello World!');
  });
});
