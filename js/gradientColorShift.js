
window.onpointermove = event => {
    
    const { clientX, clientY } = event;
    
    const mouseToColorValueX = Math.round((clientX / window.innerWidth) * 255),
          mouseToColorValueY = Math.round((clientY / window.innerHeight) * 255);
    

    
    /* This is the opposite value of each mouseToColorValue. It can be used to create an effect where the gradient is always mirrored in the other side of the mouse position spectrum. */
   
    
    /*
    
    const oppositeMouseToColorValueX = 255 - mouseToColorValueX,
          oppositeMouseToColorValueY = 255 - mouseToColorValueY;
    
    */
    
    

    const gradientColorLeft = `rgb(${mouseToColorValueX}, 88, 125)`,
          gradientColorRight = `rgb(125, 64, ${mouseToColorValueY})`;


$('.gradient').css({
   "background-image": `linear-gradient(60deg, ${gradientColorLeft},  ${gradientColorRight})`
    
});


}
