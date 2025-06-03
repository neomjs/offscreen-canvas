import MainContainer from './view/MainContainer.mjs';

export const onStart = () => Neo.app({
    appPath : 'apps/myapp/',
    mainView: MainContainer,
    name    : 'MyApp'
})
