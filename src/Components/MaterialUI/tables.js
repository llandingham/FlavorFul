import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function createData(name, type, rating, cal, cost) {
  return { name, type, rating, cal, cost };
}
//The data in rows should be DishName / Type of Cuisine / Rating / Calories / Price Per Serving / Ingredence List / Actual Recipe
const rows = [
  createData(
    "Chicken Korma",
    "Indian",
    8,
    500,
    4.0,
    ["Chicken", "Cashews", "Rice", "Ghee", "Spices"],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Chicken Biryani",
    "Indian",
    9.3,
    280,
    4.3,
    ["Chicken", "Saffron", "Rice", "Ghee", "Spices"],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Kung Pao Chicken",
    "Chinese",
    8.5,
    220,
    6.0,
    [
      "Chicken",
      "Shecuan Peppers",
      "Peanuts",
      "Celery",
      "Sesame Oil",
      "Zuchinis",
      "Rice",
    ],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Scallion Pancakes",
    "Chinese",
    7.5,
    180,
    4.3,
    ["Scallions", "Flour", "Soy Sauce", "Seasame Oil", "Eggs"],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Korean Fried Cauliflour",
    "Korean",
    9.5,
    280,
    3.9,
    [
      "Cauliflower",
      "Tempora Batter",
      "Korean Chili Paste",
      "Lime",
      "Green Onion",
    ],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Korean Chili Paste",
    "Korean",
    10,
    15,
    3.9,
    [
      "Gochujang",
      "Kalbi",
      "Korean Chili Paste",
      "Kecap Manis",
      "Honey",
      "Garlic",
      "Ginger",
      "Sugar",
      "Apple Cider Vinegar",
      "Seasame Oil",
      "Siracha",
    ],
    [
      "Place all ingredients into a blender and process until incorporated and smooth, scraping the sides occasionally to ensure even blending.",
    ]
  ),
  createData(
    "Pork Carnitas",
    "Mexican",
    7.5,
    180,
    4.3,
    [
      "Pork Butt",
      "Chipotle Peppers",
      "Chicken Stock",
      "Onion",
      "Garlic",
      "Spices",
    ],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Fajitas",
    "Mexican-TexMex",
    8,
    180,
    4.3,
    ["Skirt Steak", "Yellow Onion", "Bell Pepper", "Salt and Pepper"],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Curry Chicken Salad",
    "American-Asian Fusion",
    10,
    150,
    4.3,
    [
      "Chicken Breast",
      "Mayo",
      "Curry Powder",
      "Salt and Pepper",
      "Raisins",
      "Celery",
      "Cashews",
      "Fuji Apples",
    ],
    ["step1", "step2", "step3", "step 4"]
  ),
  createData(
    "Chicken Fried Steak",
    "American",
    8.5,
    400,
    4.3,
    ["Skirt Steak", "Flour", "Eggs", "Salt and Pepper"],
    ["step1", "step2", "step3", "step 4"]
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type of Cuisine",
  },
  { id: "rating", numeric: true, disablePadding: false, label: "Rating 0-10" },
  {
    id: "cal",
    numeric: true,
    disablePadding: false,
    label: "Calories Per Serving",
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: false,
    label: "Cost Per Serving",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"

          //ATTEMPTING TO HAVE THE SORT FEILD HEADERS TO HAVE A BLACK BACKGROUND
          //   backgroundColor="theme.palette.common.black"
          //   color="theme.palette.common.white"
        >
          Welcome to the Flavor-Ful Recipe Page
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("type");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">{row.cal}</TableCell>
                      <TableCell align="center">${row.cost}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}