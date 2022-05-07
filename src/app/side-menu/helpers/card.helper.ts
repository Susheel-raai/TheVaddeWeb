const enum CardBrandEnum{
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    AMERICANEXPRESS = 'AMERICANEXPRESS',
    DISCOVER = 'DISCOVER',
    DINERSCLUB = 'DINERSCLUB',
    JCB = 'JCB',
    MAESTRO = 'MAESTRO',
    UNIONPAY = 'UNIONPAY',
    DANKORT = 'DANKORT',
  };

const digitMask = (numDigits: number) => Array(numDigits).fill(/\d/);

export const getValidationConfigFromCardNo = (
    rawValue: string
  ): CardValidation|null =>
    cards.find(card => {
      const patterns = card.patterns.map(
        pattern => new RegExp(`^${pattern}`, 'g')
      );
      const matchResult = patterns
        .map(pattern => rawValue.match(pattern))
        .filter(result => result);
  
      return !!matchResult.length;
    }) || null;

    const defaultFormat = /(\d{1,4})/g;

    export interface CardValidation {
      type: CardBrandEnum;  
      patterns: number[];
      mask: any;
      format: RegExp;
      length: number[];
      cvvLength: number[];
      luhn: boolean;
      imagePath:string;
    }
    
    const defaultMask19 = [
      ...digitMask(4),
      ' ',
      ...digitMask(4),
      ' ',
      ...digitMask(4),
      ' ',
      ...digitMask(4),
      ' ',
      ...digitMask(3)
    ];
    
    const defaultMask16 = [
      ...digitMask(4),
      ' ',
      ...digitMask(4),
      ' ',
      ...digitMask(4),
      ' ',
      ...digitMask(4)
    ];
    
    const dinersClubMask = [
      ...digitMask(4),
      ' ',
      ...digitMask(6),
      ' ',
      ...digitMask(4)
    ];
    
    const amexMask = [
      ...digitMask(4),
      ' ',
      ...digitMask(6),
      ' ',
      ...digitMask(5)
    ];
    
    export const cards = Object.freeze([
      {
        type: CardBrandEnum.VISA,
        patterns: [4],
        format: defaultFormat,
        mask: defaultMask19,
        length: [13, 16, 19],
        cvvLength: [3],
        luhn: true,
        imagePath:'visa.png'
      },
      {
        type: CardBrandEnum.MAESTRO,
        patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
        format: defaultFormat,
        mask: defaultMask19,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvvLength: [3],
        luhn: true,
        imagePath:'MaestroCard.png'
      },
      {
        type: CardBrandEnum.DANKORT,
        patterns: [5019],
        format: defaultFormat,
        mask: defaultMask16,
        length: [16],
        cvvLength: [3],
        luhn: true,
        imagePath:'dankort.png'
      },
      {
        type: CardBrandEnum.MASTERCARD,
        patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        format: defaultFormat,
        mask: defaultMask16,
        length: [16],
        cvvLength: [3],
        luhn: true,
        imagePath:'MasterCard.png'
      },
      {
        type: CardBrandEnum.AMERICANEXPRESS,
        patterns: [34, 37],
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        mask: amexMask,
        length: [15],
        cvvLength: [3, 4],
        luhn: true,
        imagePath :'American Express.jpg'
      },
      {
        type: CardBrandEnum.DINERSCLUB,
        patterns: [30, 36, 38, 39],
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        mask: dinersClubMask,
        length: [14],
        cvvLength: [3],
        luhn: true,
        imagePath :'DinersClub.png'
      },
      {
        type: CardBrandEnum.DISCOVER,
        patterns: [60, 64, 65, 622],
        format: defaultFormat,
        mask: defaultMask16,
        length: [16],
        cvvLength: [3],
        luhn: true,
        imagePath :'Discover.png'
      },
      {
        type: CardBrandEnum.UNIONPAY,
        patterns: [62, 88],
        format: defaultFormat,
        mask: defaultMask19,
        length: [16, 17, 18, 19],
        cvvLength: [3],
        luhn: false,
        imagePath :'UnionPay.png'
      },
      {
        type: CardBrandEnum.JCB,
        patterns: [35],
        format: defaultFormat,
        mask: defaultMask19,
        length: [16, 19],
        cvvLength: [3],
        luhn: true,
        imagePath :'JCBCard.png'
      }
    ]);
    