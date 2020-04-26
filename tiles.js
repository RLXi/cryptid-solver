const tile1 = [
    [
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: 0 },
        { type: 'forest', animal: 0 }
    ]
];

const tile1f = [
    [
        { type: 'forest', animal: 0 },
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
    ],
    [
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
    ],
    [
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
    ]
];

const tile2 = [
    [
        { type: 'swamp', animal: 1 },
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'desert', animal: -1 }
    ]
];

const tile2f = [
    [
        { type: 'desert', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'swamp', animal: -1 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 }
    ],
    [
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: 1 },
        { type: 'swamp', animal: 1 }
    ],
];

const tile3 = [
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'water', animal: -1 }
    ],
    [
        { type: 'swamp', animal: 1 },
        { type: 'swamp', animal: 1 },
        { type: 'forest', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 }
    ],
    [
        { type: 'mountain', animal: 1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 }
    ]
];

const tile3f = [
    [
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: 1 }
    ],
    [
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'swamp', animal: 1 },
        { type: 'swamp', animal: 1 }
    ],
    [
        { type: 'water', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 }
    ]
];

const tile4 = [
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: 1 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: 1 }
    ]
];

const tile4f = [
    [
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ],
    [
        { type: 'water', animal: 1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ],
    [
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ]
];

const tile5 = [
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: 0 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: 0 },
        { type: 'water', animal: 0 }
    ]
];

const tile5f = [
    [
        { type: 'water', animal: 0 },
        { type: 'water', animal: 0 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ],
    [
        { type: 'mountain', animal: 0 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'swamp', animal: -1 }
    ],
    [
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 }
    ]
];

const tile6 = [
    [
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'mountain', animal: 0 },
        { type: 'mountain', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'forest', animal: -1 }
    ]
];

const tile6f = [
    [
        { type: 'forest', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 }
    ],
    [
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: 0 }
    ],
    [
        { type: 'forest', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: 0 }
    ]
];
