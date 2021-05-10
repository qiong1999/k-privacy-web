export function toast(msg) {
  const container = document.createElement('div');
  console.log('toast!!');

  document.body.appendChild(container);
  container.innerText = msg;
  Object.assign(container.style, {
    width: '150px',
    height: '40px',
    backgroundColor: '#e1e7fd',
    transform: 'translateY(-150%) translateX(-50%)',
    transition: 'transform .3s',
    position: 'fixed',
    top: '10px',
    left: '50%',
    borderRadius: '10px',
    textAlign: 'center',
    lineHeight: '40px',
    color: '#7e8390',
    fontSize: '15px',
  });
  setTimeout(() => {
    Object.assign(container.style, {
      transform: 'translateY(0%)  translateX(-50%)',
    });
  }, 0);
  setTimeout(() => {
    container.addEventListener('transitionend', (e) => {
      document.body.removeChild(container);
    });
    Object.assign(container.style, {
      transform: 'translateY(-150%)  translateX(-50%)',
    });
  }, 2000);
}
