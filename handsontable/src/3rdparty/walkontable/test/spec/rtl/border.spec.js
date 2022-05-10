describe('WalkontableBorder (RTL mode)', () => {
  const debug = false;

  beforeEach(function() {
    $('html').attr('dir', 'rtl');
    this.$wrapper = $('<div></div>').addClass('handsontable');
    this.$container = $('<div></div>');
    this.$wrapper.width(100).height(200);
    this.$table = $('<table></table>').addClass('htCore');
    this.$wrapper.append(this.$container);
    this.$container.append(this.$table);
    this.$wrapper.appendTo('body');
    createDataArray();
  });

  afterEach(function() {
    $('html').attr('dir', 'ltr');

    if (!debug) {
      $('.wtHolder').remove();
    }
    this.$wrapper.remove();
    this.wotInstance.destroy();
  });

  it('should add/remove border to selection when cell is clicked', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 1,
            color: 'red'
          }
        })
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(1) td:eq(0)');

    const $td2 = spec().$table.find('tbody tr:eq(2) td:eq(1)');
    const $top = $(wt.selections.getCell().getBorder(wt).top);
    const $end = $(wt.selections.getCell().getBorder(wt).end);
    const $bottom = $(wt.selections.getCell().getBorder(wt).bottom);
    const $start = $(wt.selections.getCell().getBorder(wt).start);

    $td1.simulate('mousedown');

    expect($top.css('height')).toBe('1px');
    expect($top.css('top')).toBe('23px');
    expect($top.css('right')).toBe('0px');
    expect($end.css('width')).toBe('1px');
    expect($end.css('top')).toBe('23px');
    expect($end.css('right')).toBe('49px');
    expect($bottom.css('height')).toBe('1px');
    expect($bottom.css('top')).toBe('46px');
    expect($bottom.css('right')).toBe('0px');
    expect($start.css('width')).toBe('1px');
    expect($start.css('top')).toBe('23px');
    expect($start.css('right')).toBe('0px');

    $td2.simulate('mousedown');

    expect($top.css('height')).toBe('1px');
    expect($top.css('top')).toBe('46px');
    expect($top.css('right')).toBe('49px');
    expect($end.css('width')).toBe('1px');
    expect($end.css('top')).toBe('46px');
    expect($end.css('right')).toBe('99px');
    expect($bottom.css('height')).toBe('1px');
    expect($bottom.css('top')).toBe('69px');
    expect($bottom.css('right')).toBe('49px');
    expect($start.css('width')).toBe('1px');
    expect($start.css('top')).toBe('46px');
    expect($start.css('right')).toBe('49px');
  });

  it('should add/remove border to selection when cell is clicked and the table has only one column', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 1,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 1,
            color: 'red'
          }
        })
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(1) td:eq(0)');
    const $top = $(wt.selections.getCell().getBorder(wt).top);
    const $end = $(wt.selections.getCell().getBorder(wt).end);
    const $bottom = $(wt.selections.getCell().getBorder(wt).bottom);
    const $start = $(wt.selections.getCell().getBorder(wt).start);

    $td1.simulate('mousedown');

    expect($top.css('height')).toBe('1px');
    expect($top.css('top')).toBe('23px');
    expect($top.css('right')).toBe('0px');
    expect($end.css('width')).toBe('1px');
    expect($end.css('top')).toBe('23px');
    expect($end.css('right')).toBe('49px');
    expect($bottom.css('height')).toBe('1px');
    expect($bottom.css('top')).toBe('46px');
    expect($bottom.css('right')).toBe('0px');
    expect($start.css('width')).toBe('1px');
    expect($start.css('top')).toBe('23px');
    expect($start.css('right')).toBe('0px');
  });

  it('should properly add a selection border on an entirely selected column', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 2,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 1,
            color: 'red'
          }
        })
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();
    wt.selections.getCell().add(new Walkontable.CellCoords(0, 0));
    wt.selections.getCell().add(new Walkontable.CellCoords(4, 0));
    wt.draw(true);

    const $top = $(wt.selections.getCell().getBorder(wt).top);
    const $end = $(wt.selections.getCell().getBorder(wt).end);
    const $bottom = $(wt.selections.getCell().getBorder(wt).bottom);
    const $start = $(wt.selections.getCell().getBorder(wt).start);

    expect($top.css('height')).toBe('1px');
    expect($top.css('top')).toBe('0px');
    expect($top.css('right')).toBe('0px');
    expect($end.css('width')).toBe('1px');
    expect($end.css('top')).toBe('0px');
    expect($end.css('right')).toBe('49px');
    expect($bottom.css('height')).toBe('1px');
    expect($bottom.css('top')).toBe('115px');
    expect($bottom.css('right')).toBe('0px');
    expect($start.css('width')).toBe('1px');
    expect($start.css('top')).toBe('0px');
    expect($start.css('right')).toBe('0px');
  });

  it('should add/remove corner to selection when cell is clicked', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(1) td:eq(0)');
    const $td2 = spec().$table.find('tbody tr:eq(2) td:eq(1)');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);

    $td1.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect($corner.css('top')).toBe('42px');
    expect($corner.css('right')).toBe('45px');

    $td2.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect($corner.css('top')).toBe('65px');
    expect($corner.css('right')).toBe('95px');
  });

  it('should render selection corner in the correct position', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(2) td:eq(1)');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);

    $td1.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('width')).toBe('6px');
    expect($corner.css('top')).toBe('65px');
    expect($corner.css('right')).toBe('95px');
  });

  it('should properly render a selection corner on the edge of the left fixed column', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      fixedColumnsStart: 2,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(2) td:eq(1)');
    const $corner = wt.selections.getCell().getBorder(wt).corner;
    const inlineStartOverlay = wt.wtOverlays.inlineStartOverlay.clone.wtTable.holder;

    $td1.simulate('mousedown');

    expect(inlineStartOverlay.getBoundingClientRect().left).toBe($corner.getBoundingClientRect().left);
  });

  it('should properly render a selection corner on the edge of the top fixed row', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      fixedRowsTop: 2,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(1) td:eq(1)');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);
    const topOverlay = $(wt.wtOverlays.topOverlay.clone.wtTable.holder);

    $td1.simulate('mousedown');

    expect(topOverlay.position().top + topOverlay.outerHeight())
      .toBe($corner.position().top + $corner.outerHeight());
  });

  it('should draw only one corner if selection is added between overlays', () => {
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 5,
      fixedColumnsStart: 2,
      fixedRowsTop: 2,
      selections: createSelectionController({
        current: createSelection({
          className: 'current',
          border: {},
        }),
        area: createSelection({
          className: 'area',
          border: {
            cornerVisible() {
              return true;
            }
          }
        }),
      }),
    });

    wt.selections.createOrGetArea().add(new Walkontable.CellCoords(0, 0));
    wt.selections.createOrGetArea().add(new Walkontable.CellCoords(2, 2));

    wt.draw();

    const corners = spec().$wrapper.find('.wtBorder.corner:visible');

    expect(corners.length).toBe(1);
  });

  it('should move the fill handle / corner border to the left, if in the position it would overlap the container (e.g.: far-right)', () => {
    spec().$wrapper.css({
      overflow: 'hidden',
      width: '200px',
    });
    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 4,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td1 = spec().$table.find('tbody tr:eq(1) td:eq(0)');
    const $td2 = spec().$table.find('tbody tr:eq(3) td:eq(3)');
    const $td3 = spec().$table.find('tbody tr:eq(2) td:eq(1)');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);

    $td1.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect($corner.css('top')).toBe('42px');
    expect($corner.css('right')).toBe('45px');
    expect(spec().$wrapper[0].clientWidth === spec().$wrapper[0].scrollWidth).toBe(true);

    $td2.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect($corner.css('top')).toBe('88px');
    expect($corner.css('right')).toBe('193px');
    expect(spec().$wrapper[0].clientWidth === spec().$wrapper[0].scrollWidth).toBe(true);

    $td3.simulate('mousedown');

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect($corner.css('top')).toBe('65px');
    expect($corner.css('right')).toBe('95px');
    expect(spec().$wrapper[0].clientWidth === spec().$wrapper[0].scrollWidth).toBe(true);
  });

  it('should move the fill handle / corner border to the top, if in the position it would overlap the container (e.g.: far-bottom)', () => {
    spec().$wrapper.css({
      height: '',
      marginTop: '2000px',
    });

    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 5,
      totalColumns: 1,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td = spec().$table.find('tbody tr:last-of-type td:last-of-type');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);

    $td.simulate('mousedown');

    wt.draw();

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect(spec().$table.css('height')).toBe('116px');
    expect($corner.css('top')).toBe('109px'); // table.height - corner.height - corner.borderTop
    expect($corner.css('right')).toBe('45px');
    expect(spec().$wrapper[0].clientHeight === spec().$wrapper[0].scrollHeight).toBe(true);
  });

  it('should move the corner border to the top-right, if is not enough area on the bottom-left corner of container', () => {
    spec().$wrapper.css({
      height: '',
      width: '50px',
      marginTop: '2000px',
      marginRight: '2000px',
    });

    const wt = walkontable({
      rtlMode: true,
      data: getData,
      totalRows: 1,
      totalColumns: 1,
      selections: createSelectionController({
        current: createSelection({
          border: {
            width: 2,
            color: 'green',
            cornerVisible() {
              return true;
            }
          }
        }),
        area: createSelection({}),
      }),
      onCellMouseDown(event, coords) {
        wt.selections.getCell().clear();
        wt.selections.getCell().add(coords);
        wt.draw();
      }
    });

    wt.draw();

    const $td = spec().$table.find('tbody tr:last-of-type td:last-of-type');
    const $corner = $(wt.selections.getCell().getBorder(wt).corner);

    $td.simulate('mousedown');

    wt.draw();

    expect($corner.css('width')).toBe('6px');
    expect($corner.css('height')).toBe('6px');
    expect(spec().$table.css('height')).toBe('24px');
    expect($corner.css('top')).toBe('17px'); // table.height - corner.height - corner.borderTop
    expect($corner.css('right')).toBe('43px');
    expect(spec().$wrapper[0].clientHeight === spec().$wrapper[0].scrollHeight).toBe(true);
    expect(spec().$wrapper[0].clientWidth === spec().$wrapper[0].scrollWidth).toBe(true);
  });
});
