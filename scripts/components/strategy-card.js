import { createElement, getElement, addEventListeners } from '../utils/dom.js';
import { Modal } from './modal.js';

/**
 * Strategy Card Component
 * @class
 * @description Handles strategy card interactions and animations
 */
export class StrategyCard {
    /**
     * @param {string} selector - CSS selector for strategy cards
     * @throws {Error} If no strategy cards are found
     */
    constructor(selector = '.strategy-card') {
        this.cards = document.querySelectorAll(selector);
        if (this.cards.length === 0) {
            throw new Error('No strategy cards found');
        }
        this.modal = null;
        this.init();
    }

    /**
     * Initialize the strategy cards
     * @private
     */
    init() {
        // Initialize modal after a short delay
        setTimeout(() => {
            this.modal = new Modal();
            this.setupCards();
        }, 0);
    }

    /**
     * Set up all strategy cards
     * @private
     */
    setupCards() {
        this.cards.forEach(card => {
            this.setupCardInteractions(card);
        });
    }

    /**
     * Set up card interactions
     * @param {HTMLElement} card - The strategy card element
     * @private
     */
    setupCardInteractions(card) {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

    }

    /**
     * Handle read more link click
     * @param {HTMLElement} card - The strategy card element
     * @param {string} href - The link href
     * @throws {Error} If modal is not initialized or required elements are missing
     * @private
     */
    handleReadMoreClick(card, href) {
        if (!this.modal) {
            throw new Error('Modal not initialized');
        }

        const titleElement = card.querySelector('h3');
        const descriptionElement = card.querySelector('p');

        if (!titleElement || !descriptionElement) {
            throw new Error('Required elements not found in strategy card');
        }

        const title = titleElement.textContent;
        const description = descriptionElement.textContent;

        // Create modal content
        const content = createElement('div', { className: 'strategy-preview' }, [
            createElement('p', {}, description),
            createElement('a', {
                href: href,
                className: 'btn btn-primary mt-2',
                textContent: 'View Full Strategy'
            })
        ]);

        // Show modal
        this.modal.open({
            title: title,
            content: content
        });
    }
}

// Initialize strategy cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new StrategyCard();
    } catch (error) {
        console.error('Failed to initialize strategy cards:', error);
    }
}); 