export const isAuth = {
    get: () => sessionStorage.getItem('authState') === 'true',
    set: (state: boolean) => sessionStorage.setItem('authState', state.toString())
  };