describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, { provide: getRepositoryToken(User), useValue: mockRepo }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should hash password on create', async () => {
    const user = await service.createUser({ email: 'test@test.com', password: '123456' });
    expect(user.password).not.toBe('123456');
  });
});
