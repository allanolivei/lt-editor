window.addEventListener('message', e =>
{
    if ('production' !== process.env.NODE_ENV) console.clear();
});