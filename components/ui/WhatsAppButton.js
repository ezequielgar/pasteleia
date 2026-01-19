'use client';

export default function WhatsAppButton({ phoneNumber, message, children, className = '' }) {
    const handleClick = () => {
        const phone = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493814637258';
        const encodedMessage = message ? encodeURIComponent(message) : '';
        const whatsappLink = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <>
            <button className={`whatsapp-button ${className}`} onClick={handleClick}>
                <div>
                    <span>{children || '📱 Contactar por WhatsApp'}</span>
                </div>
            </button>

            <style jsx>{`
                .whatsapp-button {
                    --whatsapp-green: #25D366;
                    --whatsapp-dark: #128C7E;
                    --stone-50: #fafaf9;

                    font-size: 1rem;
                    cursor: pointer;
                    position: relative;
                    font-family: "Rubik", sans-serif;
                    font-weight: bold;
                    line-height: 1;
                    padding: 1px;
                    border: none;
                    transform: translate(-4px, -4px);
                    outline: 2px solid transparent;
                    outline-offset: 5px;
                    border-radius: 9999px;
                    background-color: var(--whatsapp-dark);
                    color: var(--whatsapp-dark);
                    transition:
                        transform 150ms ease,
                        box-shadow 150ms ease;
                    text-align: center;
                    box-shadow:
                        0.5px 0.5px 0 0 var(--whatsapp-dark),
                        1px 1px 0 0 var(--whatsapp-dark),
                        1.5px 1.5px 0 0 var(--whatsapp-dark),
                        2px 2px 0 0 var(--whatsapp-dark),
                        2.5px 2.5px 0 0 var(--whatsapp-dark),
                        3px 3px 0 0 var(--whatsapp-dark),
                        0 0 0 2px var(--stone-50),
                        0.5px 0.5px 0 2px var(--stone-50),
                        1px 1px 0 2px var(--stone-50),
                        1.5px 1.5px 0 2px var(--stone-50),
                        2px 2px 0 2px var(--stone-50),
                        2.5px 2.5px 0 2px var(--stone-50),
                        3px 3px 0 2px var(--stone-50),
                        3.5px 3.5px 0 2px var(--stone-50),
                        4px 4px 0 2px var(--stone-50);
                }

                .whatsapp-button:hover {
                    transform: translate(0, 0);
                    box-shadow: 0 0 0 2px var(--stone-50);
                }

                .whatsapp-button:active,
                .whatsapp-button:focus-visible {
                    outline-color: var(--whatsapp-green);
                }

                .whatsapp-button:focus-visible {
                    outline-style: dashed;
                }

                .whatsapp-button > div {
                    position: relative;
                    pointer-events: none;
                    background-color: var(--whatsapp-green);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 9999px;
                }

                .whatsapp-button > div::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: 9999px;
                    opacity: 0.5;
                    background-image: radial-gradient(
                            rgb(255 255 255 / 80%) 20%,
                            transparent 20%
                        ),
                        radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
                    background-position:
                        0 0,
                        4px 4px;
                    background-size: 8px 8px;
                    mix-blend-mode: hard-light;
                    animation: dots 0.5s infinite linear;
                }

                .whatsapp-button > div > span {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem 1.25rem;
                    gap: 0.25rem;
                    filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));
                    color: white;
                    font-weight: 700;
                }

                .whatsapp-button > div > span:active {
                    transform: translateY(2px);
                }

                @keyframes dots {
                    0% {
                        background-position:
                            0 0,
                            4px 4px;
                    }
                    100% {
                        background-position:
                            8px 0,
                            12px 4px;
                    }
                }
            `}</style>
        </>
    );
}
