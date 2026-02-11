// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const heartsContainer = document.getElementById("hearts-container");
const confettiContainer = document.getElementById("confetti-container");

// Create falling hearts in background (rain effect)
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Variety of heart symbols
        const heartSymbols = ['♥', '♡', '❤', '💕', '💖', '💗'];
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = '0s';
        
        // Random opacity for depth effect
        const opacity = Math.random() * 0.4 + 0.4;
        heart.style.opacity = opacity;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 30); // 10x more hearts - very dense rain!
}

// Create confetti explosion
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6b9d', '#c71585', '#ffb6c1'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            
            const size = Math.random() * 8 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 15);
    }
}

// Start floating hearts
createFloatingHearts();

// Click Envelope with animation
envelope.addEventListener("click", () => {
    envelope.style.transform = "scale(0.8)";
    envelope.style.opacity = "0";
    envelope.style.transition = "all 0.5s ease";
    
    setTimeout(() => {
        envelope.style.display = "none";
        letter.style.display = "flex";
        
        setTimeout(() => {
            document.querySelector(".letter-window").classList.add("open");
        }, 50);
    }, 500);
});

// Logic to move the NO button - keeping it inside the viewport
let noClickCount = 0;

noBtn.addEventListener("mouseover", () => {
    const btnRect = noBtn.getBoundingClientRect();
    const noWrapper = document.querySelector('.no-wrapper');
    const wrapperRect = noWrapper.getBoundingClientRect();
    
    // Get current transform values
    const style = window.getComputedStyle(noBtn);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const currentX = matrix.m41;
    const currentY = matrix.m42;
    
    // Calculate safe bounds within viewport
    const padding = 20;
    const minX = padding - wrapperRect.left;
    const maxX = window.innerWidth - wrapperRect.left - btnRect.width - padding;
    const minY = padding - wrapperRect.top;
    const maxY = window.innerHeight - wrapperRect.top - btnRect.height - padding;
    
    // Generate random position within safe bounds
    let randomX, randomY;
    let attempts = 0;
    do {
        randomX = Math.random() * (maxX - minX) + minX;
        randomY = Math.random() * (maxY - minY) + minY;
        attempts++;
    } while (Math.abs(randomX - currentX) < 50 && Math.abs(randomY - currentY) < 50 && attempts < 10);
    
    noBtn.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
});

// Add frustrated shake when clicking NO
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noClickCount++;
    
    // Make the whole window shake
    const letterWindow = document.querySelector('.letter-window');
    letterWindow.style.animation = 'none';
    setTimeout(() => {
        letterWindow.style.animation = 'shake 0.5s ease';
    }, 10);
    
    // Change title based on clicks
    if (noClickCount === 1) {
        title.textContent = "Are you sure? 🥺";
    } else if (noClickCount === 2) {
        title.textContent = "Really? Pretty please? 🥹";
    } else if (noClickCount === 3) {
        title.textContent = "Come on... Just say yes! 💕";
    } else if (noClickCount >= 4) {
        title.textContent = "I'll keep asking until you say yes! 😸";
    }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-2deg); }
        75% { transform: translateX(10px) rotate(2deg); }
    }
`;
document.head.appendChild(style);

// YES is clicked - CELEBRATION!
yesBtn.addEventListener("click", () => {
    title.textContent = "Lets gooooooo !!!";
    
    catImg.src = "cat_dance.gif";
    
    // Change LoL GIFs to celebration ones
    const luxGif = document.getElementById('lux-gif');
    const garenGif = document.getElementById('garen-gif');
    
    luxGif.src = "malphite-laugh.gif";
    garenGif.src = "zed-happy.webp";
    
    document.querySelector(".letter-window").classList.add("final");
    
    // Hide buttons with animation
    buttons.style.transform = "scale(0)";
    buttons.style.opacity = "0";
    buttons.style.transition = "all 0.4s ease";
    
    setTimeout(() => {
        buttons.style.display = "none";
        finalText.style.display = "block";
    }, 400);
    
    // CONFETTI EXPLOSION!
    createConfetti();
    
    // Create extra heart burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = '♥';
            heart.style.left = '50%';
            heart.style.bottom = '50%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = 'heart-burst 2s ease-out forwards';
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
});

// Add heart burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes heart-burst {
        0% {
            transform: translate(-50%, 50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), calc(50% + var(--ty))) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Add sparkle effect to cursor when hovering over buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2) ' + this.style.filter;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.filter = this.style.filter.replace('brightness(1.2) ', '');
    });
});
