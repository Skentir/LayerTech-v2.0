// Imports
import Vuetify from 'vuetify';
import Login from '@/views/Login.vue';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

describe('Login.vue', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => mount(Login, {
    localVue,
    vuetify,
    ...options,
  });

  it('reveals an error message when login failed due to empty username or password', async () => {
    const wrapper = mountFunction();
    await wrapper.find('#username_tfield').setValue('');
    await wrapper.find('#password_tfield').setValue('');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('#error-msg').text())
      .toBe('The username and password you entered did not match our records. Please double-check and try again.');
  });

  it('reveals an error message when login failed due to incorrect credentials', async () => {
    const wrapper = mountFunction();
    await wrapper.find('#username_tfield').setValue('admin123');
    await wrapper.find('#password_tfield').setValue('wrongPassword');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.find('#error-msg').text())
      .toBe('The username and password you entered did not match our records. Please double-check and try again.');
  });

  it('login successful', async () => {
    const mockRoute = {
      params: {
        id: 1,
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Login, {
      localVue,
      vuetify,
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find('#username_tfield').setValue('admin123');
    await wrapper.find('#password_tfield').setValue('correctPassword');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockRouter.push).toHaveBeenCalledWith('/home');
  });
});
