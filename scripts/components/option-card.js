import { getElement } from '../utils/dom.js';
import { Modal } from './modal.js';

/**
 * Option Card Component
 * @class
 * @description Handles option card interactions and problem display
 */
export class OptionCard {
    /**
     * @param {HTMLElement} element - The option card element
     * @throws {Error} If required elements are not found
     */
    constructor(element) {
        this.card = element;
        this.showAnalysisBtn = this.card.querySelector('.show-analysis-btn');
        this.title = this.card.querySelector('.option-title');
        this.summary = this.card.querySelector('.option-summary');
        this.details = this.card.querySelector('.option-details');
        
        if (!this.showAnalysisBtn || !this.title || !this.details) {
            throw new Error('Required elements not found in option card');
        }
        
        // Initialize modal if it doesn't exist
        if (!window.sharedModal) {
            window.sharedModal = new Modal();
        }
        this.modal = window.sharedModal;
        this.setupEventListeners();
    }

    /**
     * Set up event listeners for the option card
     * @private
     */
    setupEventListeners() {
        this.showAnalysisBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showAnalysis();
        });
    }

    /**
     * Show the analysis in a modal
     * @private
     * @throws {Error} If details or modal is not available
     */
    showAnalysis() {
        if (!this.details || !this.modal) {
            throw new Error('Details or modal not available');
        }
        
        const content = this.details.cloneNode(true);
        content.style.display = 'block';
        
        this.modal.open({
            title: this.title.textContent,
            content: content
        });
    }
}

// Initialize all option cards
document.addEventListener('DOMContentLoaded', () => {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        try {
            new OptionCard(card);
        } catch (error) {
            console.error('Failed to initialize option card:', error);
        }
    });
});

// Add strategy button functionality
document.addEventListener('DOMContentLoaded', function() {
    const strategyButton = document.getElementById('strategyButton');
    
    if (strategyButton && window.sharedModal) {
        strategyButton.addEventListener('click', function() {
            const content = document.createElement('div');
            content.innerHTML = `
                <h3>What is the runtime of the fully memoized solution?</h3>
                <h4>Explanation:</h4>
                <p>The fully memoized solution (recursion + memoization) has a time complexity of <strong>O(n × target)</strong>, where <code>n</code> is the number of elements and <code>target</code> is the sum you're trying to reach. This is because there are at most <code>n × target</code> unique subproblems, and each is solved only once and stored in the memoization dictionary.</p>
            `;
            
            window.sharedModal.open({
                title: 'Final Runtime',
                content: content
            });
        });
    }
}); 