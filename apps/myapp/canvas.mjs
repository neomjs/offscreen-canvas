const onStart = () => {
    import('./canvas/Helper.mjs').then(module => {
        console.log(module.default);
    })
};

export {onStart as onStart};
