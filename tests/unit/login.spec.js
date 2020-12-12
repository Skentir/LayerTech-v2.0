import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
  it('reveals an error message when login failed', async () => {
    const wrapper = mount(Login);
    await wrapper.find('[data-username]').setValue('');
    await wrapper.find('[data-password]').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('#error-msg').text())
      .toBe('The username and password you entered did not match our records. Please double-check and try again.');
  });
});
