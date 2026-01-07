export class Pagination {
  readonly limit?: number;
  readonly page?: number;

  constructor(limit: number, page: number) {
    this.limit = limit > 0 && limit < 50 ? limit : 20;
    this.page = page > 0 ? page : 1;
  }

  private get offset() {
    return (this.page - 1) * this.limit;
  }

  get options() {
    return {
      offset: this.offset,
      limit: this.limit,
    };
  }

  response(total: number) {
    const totalPages = Math.ceil(total / this.limit);

    return {
      page: this.page,
      limit: this.limit,
      total,
      totalPages,
    };
  }
}
