import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['content', 'item'];
    static values = {
        orientation: { type: String, default: 'horizontal' },
        loop: { type: Boolean, default: false },
    };

    declare readonly contentTarget: HTMLElement;
    declare readonly itemTargets: HTMLElement[];
    declare orientationValue: string;
    declare loopValue: boolean;

    private currentIndex = 0;

    connect(): void {
        this.updateButtons();
    }

    previous(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToIndex(this.currentIndex);
        } else if (this.loopValue) {
            this.currentIndex = this.itemTargets.length - 1;
            this.scrollToIndex(this.currentIndex);
        }
    }

    next(): void {
        if (this.currentIndex < this.itemTargets.length - 1) {
            this.currentIndex++;
            this.scrollToIndex(this.currentIndex);
        } else if (this.loopValue) {
            this.currentIndex = 0;
            this.scrollToIndex(this.currentIndex);
        }
    }

    goTo(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.carouselIndex || '0', 10);
        this.currentIndex = index;
        this.scrollToIndex(index);
    }

    private scrollToIndex(index: number): void {
        const item = this.itemTargets[index];
        if (!item) return;

        const content = this.contentTarget;
        const isHorizontal = this.orientationValue === 'horizontal';

        if (isHorizontal) {
            const scrollLeft = index === 0 ? 0 : item.offsetLeft - content.offsetLeft;
            content.scrollTo({
                left: scrollLeft,
                behavior: 'smooth',
            });
        } else {
            const scrollTop = index === 0 ? 0 : item.offsetTop - content.offsetTop;
            content.scrollTo({
                top: scrollTop,
                behavior: 'smooth',
            });
        }

        this.updateButtons();
        this.updateAriaLabels();
    }

    private updateButtons(): void {
        const prevButton = this.element.querySelector('.carousel-previous') as HTMLButtonElement;
        const nextButton = this.element.querySelector('.carousel-next') as HTMLButtonElement;

        if (prevButton) {
            prevButton.disabled = !this.loopValue && this.currentIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = !this.loopValue && this.currentIndex === this.itemTargets.length - 1;
        }
    }

    private updateAriaLabels(): void {
        this.itemTargets.forEach((item, index) => {
            item.setAttribute('aria-label', `Slide ${index + 1} of ${this.itemTargets.length}`);
        });
    }

    // Handle keyboard navigation
    keydown(event: KeyboardEvent): void {
        const isHorizontal = this.orientationValue === 'horizontal';

        switch (event.key) {
            case 'ArrowLeft':
                if (isHorizontal) {
                    event.preventDefault();
                    this.previous();
                }
                break;
            case 'ArrowRight':
                if (isHorizontal) {
                    event.preventDefault();
                    this.next();
                }
                break;
            case 'ArrowUp':
                if (!isHorizontal) {
                    event.preventDefault();
                    this.previous();
                }
                break;
            case 'ArrowDown':
                if (!isHorizontal) {
                    event.preventDefault();
                    this.next();
                }
                break;
        }
    }
}
